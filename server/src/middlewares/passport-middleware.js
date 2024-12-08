const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const db = require("../db");

const cookieExtractor = function (req) {
  let token = null;
  // if there is a cookie called token, return that
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

// options
const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

// create protected route
passport.use(
  // create a new strategy with the options
  new Strategy(opts, async ({ id }, done) => {
    try {
      // extract id and find user based on id
      const { rows } = await db.query(
        "SELECT user_id, email FROM users where user_id = $1",
        [id]
      );

      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      // console.log("Authenticated User:", rows[0]);
      let user = { id: rows[0].user_id, email: rows[0].email };

      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);
