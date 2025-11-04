const express = require("express");
const routes = express.Router();

const validate = require("../middlewares/validate");
const { userCreateSchema, userLoginSchema } = require("../validations/userValidations");
const AuthController = require("../controllers/authController");
const profileRoutes = require("./profileRoutes");
const bannerRoutes = require("./bannerRoutes");
const serviceRoutes = require("./serviceRoutes");
const transactionRoutes = require("./transactionRoutes");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/userController");
const TransactionController = require("../controllers/transactionController");
const { topUpSchema } = require("../validations/transactionValidation");

// Auth
routes.post("/registration", validate(userCreateSchema), AuthController.register)
routes.post("/login", validate(userLoginSchema), AuthController.login)

//Profile
routes.use("/profile", profileRoutes)

//balance
routes.get("/balance", authentication, UserController.getBalanceByUserId)

//banner
routes.use("/banner", bannerRoutes)

//service
routes.use("/services", serviceRoutes)

//topUp
routes.post("/topup", authentication, validate(topUpSchema), TransactionController.topUp)

//transaction
routes.use("/transaction", transactionRoutes)


module.exports = routes