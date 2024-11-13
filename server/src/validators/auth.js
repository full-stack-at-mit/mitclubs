const { check } = require("express-validator");
db = require("../db");
const { compare } = require("bcryptjs");

// password should have length constraints
const password = check("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password must be un between 6 and 15 characters.");

// check if the email actually exists
const email = check("email")
  .isEmail()
  .withMessage("Please provide a valid email.");

// check if email already exists
const emailExists = check("email").custom(async (value) => {
  // get emails
  const { rows } = await db.query("SELECT * from users WHERE email = $1", [
    value,
  ]);

  // this means we found an existing email
  if (rows.length) {
    throw new Error("Email already exists.");
  }
});

// login validation
const loginFieldsCheck = check("email").custom(async (value, { req }) => {
  const user = await db.query("SELECT * from users WHERE email = $1", [value]);
  if (!user.rows.length) {
    throw new Error("Email does not exist.");
  }

  // compare encrypted password with password provided
  const validPassword = await compare(req.body.password, user.rows[0].password);

  if (!validPassword) {
    throw new Error("Incorrect password.");
  }
  
  req.user = user.rows[0]
});

module.exports = {
  registerValidation: [email, password, emailExists],
  loginValidation: [loginFieldsCheck],
};
