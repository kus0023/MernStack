const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Item Model
const User = require("../../models/User");
const auth = require("../middleware/auth");

//@route GET api/auth
//@desc authenticate the user(Login)
//@access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  //check for existing user
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "user does not exist." });

      //validate password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "incorrect password." });

        jwt.sign(
          { id: user.id },
          process.env.JWTSECRETE,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ msg: "Server error! Please try again later." });
    });
});

//@route GET api/auth/user
//@desc get user data
//@access private
router.get("/user", auth, (req, res) => {
  //req.user.id is comming from auth middleware in middleware/auth.js
  User.findById(req.user.id)
    .select("-password -__v")
    .then((user) => res.json({ user }));
});

module.exports = router;
