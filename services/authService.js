const { signToken } = require("../../../../../J_kampus/Tani-Mart/server/helpers/jwt");
const pool = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const UserService = require("./userService");

class AuthService {
  static async register(email, first_name, last_name, password) {
    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      throw {
        status: 400,
        message: "Email telah digunakan",
        name: "Bad request"
      };
    }
    const hashedPassword = await hashPassword(password);
    const query = `
            insert into "Users" ("email", "first_name", "last_name", "password")
            values ($1, $2, $3, $4)
            returning id, email, first_name, last_name;
        `;

    const values = [email, first_name, last_name, hashedPassword];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async login(email, password) {
    const existingUser = await UserService.findUserByEmail(email);
    if (!existingUser) {
      throw {
        status: 401,
        message: "Username atau password salah",
        name:"Unauthorized"
      };
    }
    
    const compare = await comparePassword(password, existingUser.password);
    if (!compare) {
      throw {
        status: 401,
        message: "Username atau password salah",
        name:"Unauthorized"
      };
    }

    const token = await signToken({
        id: existingUser.id,
        email: existingUser.email
    })

    return {token}
  }
}

module.exports = AuthService;
