const UserService = require("../services/userService");

class UserController {
  static async getProfile(req, res, next) {
    try {
      const user = await UserService.findUserById(req.user.id);
      res.status(200).json({
        status: 200,
        message: "Sukses",
        data: user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editProfile(req, res, next) {
    try {
      const { first_name, last_name } = req.body;
      const data = await UserService.updateUserProfile(
        first_name,
        last_name,
        req.user.id
      );
      res.status(200).json({
        status: 200,
        message: "Update profile berhasil",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        throw {
          status: 400,
          message: "File gambar tidak boleh kosong",
          name: "Bad request",
        };
      }

      const { buffer, mimetype } = req.file;
      const data = await UserService.uploadImageProfile(buffer, mimetype, req.user.id);
      res.status(200).json({
        status: 200,
        message: "Update profile image berhasil",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getBalanceByUserId(req, res, next) {
    try {
      const data = await UserService.findBalanceByUserId(req.user.id);
      res.status(200).json({
        status: 200,
        message: "Get Balance berhasil",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
