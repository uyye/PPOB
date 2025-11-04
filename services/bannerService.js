const pool = require("../config/db");

class BannerService {
  static async getAllBanner() {
    const query = `
            select b."banner_name", b."banner_image", b."description" from "Banners" b;
        `;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = BannerService;
