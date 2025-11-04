const express = require("express");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/userController");
const validate = require("../middlewares/validate");
const uploadImage = require("../middlewares/uploadImage");
const { userUpdateSchema } = require("../validations/userValidations");

const routes = express.Router();

routes.use(authentication);
routes.get("", UserController.getProfile);
routes.put("/update", validate(userUpdateSchema), UserController.editProfile);
routes.put("/image", uploadImage, UserController.uploadImage);

module.exports = routes;
