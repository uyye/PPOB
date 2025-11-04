const UserService = require("../services/userService");
const { verifyToken } = require("../utils/jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw {
        status: 401,
        message: "Token tidak tidak valid atau kadaluwarsa",
        name: "Unauthorized",
      };
    }

    const token = authorization.split(" ")[1];
    const verify = await verifyToken(token);
    if (!verify) {
      throw {
        status: 401,
        message: "Token tidak tidak valid atau kadaluwarsa",
        name: "Unauthorized",
      };
    }

    const existingUser = await UserService.findUserByEmail(verify.email);
    if (!existingUser) {
      throw {
        status: 401,
        message: "Token tidak tidak valid atau kadaluwarsa",
        name: "Unauthorized",
      };
    }

    req.user = {
      id: existingUser.id,
      email: existingUser.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication