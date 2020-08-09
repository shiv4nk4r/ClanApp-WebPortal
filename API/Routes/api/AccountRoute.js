const accountRoute = require("express").Router();
const User = require("../../Model/User");
const Session = require("../../Model/userSession");
const bcrypt = require("bcryptjs");
const verify = require("../verifyToken");
const { required } = require("@hapi/joi");
const { registerValidation, loginValidation } = require("../Validation");
const userSession = require("../../Model/userSession");

//Registger User
accountRoute.post("/register", async (req, res) => {
  const { body } = req;
  const { firstName, lastName, email, password } = body;

  const { error } = registerValidation(body);
  if (error) return res.status(400).send(error);

  //Checking if the email already exist or not
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.end("Some error");
  }
});

//Login User
accountRoute.post("/login", async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  //LETS VALIDATE before we Login
  const { error } = loginValidation(body);
  if (error) return res.status(400).send(error);

  //Checking if the email already exist or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  //If PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is not valid");

  const userSession = new Session({
    userID: user._id,
  });

  try {
    const savedSession = userSession.save();
    res.header("authtoken", userSession._id).send(userSession._id);
  } catch (err) {
    res.send(err);
  }
});

//Logout User
accountRoute.post("/logout", verify, async (req, res) => {
  const authtoken = req.header("authtoken");

  const logout = Session.updateOne(
    { _id: authtoken },
    { $set: { loggedOut: true } },
    (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    }
  );
});

//View All Users
accountRoute.get("/find", verify, (req, res) => {
  const users = User.find({}, (err, data) => {
    if (err) {
      res.end(err);
    }
    res.send(data);
  });
});

//Find User with ID
accountRoute.get("/find/:id", verify, (req, res) => {
  const { params } = req;
  const { id } = params;
  const user = User.find({ _id: id }, (err, data) => {
    if (err) {
      res.send("No user Found");
    }
    res.send(data);
  });
});

module.exports = accountRoute;
