const pool = require("../config/db");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLODINARYCLOUDNAME,
  api_key: process.env.CLODINARYAPIKEY,
  api_secret: process.env.CLODINARYAPISECRET,
});

class UserService {
  static async findUserByEmail(email) {
    const query = `
            select u.id, u.email, u.password from "Users" u
            where "email" = $1;
        `;

    const value = [email];
    const { rows } = await pool.query(query, value);
    return rows[0];
  }

  static async findUserById(id) {
    const query = `
        select u."email", u."first_name", u."last_name", u."profile_image" from "Users" u
        where "id" = $1
        `;
    const value = [id];
    const { rows } = await pool.query(query, value);

    if (!rows[0]) {
      throw {
        status: 400,
        message: "Profil pengguna tidak di temukan",
        name: "Not found",
      };
    }

    return rows[0];
  }

  static async updateUserProfile(first_name, last_name, id) {
    await this.findUserById(id);
    const query = `
        update "Users"
        set
        "first_name" = $1,
        "last_name" = $2,
        "updated_at" = now()
        where "id" = $3
        returning "email", "first_name", "last_name", "profile_image"
    `;
    const values = [first_name, last_name, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async uploadImageProfile(buffer, mimetype, userId) {
    if (!buffer && !mimetype) {
      throw {
        status: 400,
        message: "File gambar tidak boleh kosong",
        name: "Bad request",
      };
    }

    let base64 = Buffer.from(buffer).toString("base64");
    let dataUrl = `data:${mimetype};base64,${base64}`;
    const response = await cloudinary.uploader.upload(dataUrl);
    const newImage = response.secure_url;

    const query = `
      update "Users"
      set
      "profile_image" = $1
      where "id" = $2
      returning "email", "first_name", "last_name", "profile_image";
    `;

    const value = [newImage, userId];
    const { rows } = await pool.query(query, value);
    return rows[0];
  }

  static async findBalanceByUserId(id) {
    await this.findUserById(id);
    const query = `
      select u."balance" from "Users" u
      where "id" = $1
    `;
    const value = [id];
    const { rows } = await pool.query(query, value);
    return rows[0];
  }
}

module.exports = UserService;
