const db = require("../db");
// used to encrypt passwords
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query("select user_id, email from users");
    console.log("working!");
    console.log(rows);
    return res.status(200).json({ success: true, users: rows });
  } catch (error) {
    console.log(error.message);
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected info",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);

    // query postgresql database
    await db.query("insert into users(email, password) values ($1, $2)", [
      email,
      hashedPassword,
    ]);

    return res.status(201).json({
      success: true,
      message: "Registration was successful!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  let user = req.user;
  payload = {
    id: user.user_id,
    email: user.email,
  };

  try {
    // create jwt token
    const token = await sign(payload, SECRET);
    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // delete the token stored in the client
    return res
      .status(200)
      .clearCookie("token", { httpOnly: true })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};
