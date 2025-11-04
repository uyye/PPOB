const BannerService = require("../services/bannerService");

class BannerController {
  static async getAllBanner(req, res, next) {
    try {
      const data = await BannerService.getAllBanner();
      res.status(200).json({
        status: 200,
        message: "Sukses",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = BannerController;
