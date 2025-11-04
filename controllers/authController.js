const AuthService = require("../services/authService");

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, first_name, last_name, password } = req.body;
      const newUser = await AuthService.register(
        email,
        first_name,
        last_name,
        password
      );
      res.status(201).json({
        status: 201,
        message: "Registrasi berhasil silahkan login",
        data:null
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password)
      res.status(200).json({
        status:201,
        message:"Login Sukses",
        data
      })
      
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthController;
