const apiRoute = require("express").Router();

//Getting all the child Routes
const accountRoute = require("./api/AccountRoute");

//Handling all the child Routes
apiRoute.use("/account", accountRoute);

module.exports = apiRoute;
