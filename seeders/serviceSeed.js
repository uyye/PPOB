const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

(async () => {
  try {
    const filePath = path.join(__dirname, "../data/services.json");
    const services = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await pool.query(`delete from "Services";`);

    for (const service of services) {
      await pool.query(
        `insert into "Services" ("service_code", "service_name", "service_icon", "service_tarif") values ($1, $2, $3, $4);`,
        [
          service.service_code,
          service.service_name,
          service.service_icon,
          service.service_tarif,
        ]
      );
    }

    console.log("SERVICES SEEDS SUCCESSFULLY");
  } catch (error) {
    console.log(error);
  }
})();
