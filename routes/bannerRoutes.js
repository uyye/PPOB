const express = require("express");
const BannerController = require("../controllers/bannerController");
const route = express.Router();


route.get("", BannerController.getAllBanner)


module.exports = route