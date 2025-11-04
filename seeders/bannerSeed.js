const pool = require("../config/db");
const path = require("path");
const fs = require("fs");

(async () => {
  try {
    const filePath = path.join(__dirname, "../data/banners.json");
    const banners = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await pool.query(`delete from "Banners";`);

    for (const banner of banners) {
      await pool.query(
        `insert into "Banners" ("banner_name", "banner_image", "description") values ($1, $2, $3);`,
        [banner.banner_name, banner.banner_image, banner.description]
      );
    }

    console.log("BANNERS SEEDS SUCCESSFULY");
  } catch (error) {
    console.log(error);
  }
})();
