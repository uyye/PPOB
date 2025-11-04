const express = require("express");
const authentication = require("../middlewares/authentication");
const ServiceController = require("../controllers/serviceController");
const route = express.Router()

route.use(authentication)
route.get("", ServiceController.getAllServices)

module.exports = route