const userSession = require("../../API/Model/userSession");

module.exports = function (req, res, next) {
  const authtoken = req.header("authtoken");
  if (!authtoken) return res.status(401).send("Access Denied");
  const session = userSession.findOne({ _id: authtoken }, (err, data) => {
    if (err) {
      res.send(err);
    }
    if (data) {
      if (data.loggedOut == false) {
        req.authtoken = authtoken;
        next();
      } else {
        res.status(400).send("Invalid Token");
      }
    } else {
      res.status(401).send("Access Denied");
    }
  });
};
