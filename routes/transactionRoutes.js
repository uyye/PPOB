const express = require("express");
const authentication = require("../middlewares/authentication");
const TransactionController = require("../controllers/transactionController");
const routes = express.Router();

routes.use(authentication);
routes.post("", TransactionController.transaction);
routes.get("/history", TransactionController.transactionHistory);

module.exports = routes;
