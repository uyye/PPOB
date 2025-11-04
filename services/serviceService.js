const pool = require("../config/db");

class ServiceService {
  static async getAllService() {
    const query = `
            select s."service_code", s."service_name", s."service_icon", s."service_tarif" from "Services" s;
        `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getOneByServiceCode(service_code) {
    const query = `
            select * from "Services"  where "service_code" = $1
        `;
    const value = [service_code];
    const { rows, rowCount } = await pool.query(query, value);
    if (rowCount === 0) {
      throw {
        status: 404,
        message: `Service ataus Layanan tidak ditemukan`,
        name: "Not found",
      };
    }

    return rows[0]
  }
}

module.exports = ServiceService;
