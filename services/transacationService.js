const pool = require("../config/db");
const generateInvoice = require("../utils/generateInvoice");
const ServiceService = require("./serviceService");

class TransactionService {
  static async topUp(id, top_up_amount) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const balance = await client.query(
        `
        select "balance" from "Users"
        where "id" = $1
      `,
        [id]
      );

      if (balance.rowCount === 0) {
        throw {
          name: "Not found",
          status: 404,
          message: "Pengguna tidak ditemukan",
        };
      }

      const currentBalance = balance.rows[0].balance;
      const newBalance = currentBalance + top_up_amount;

      const updateBalance = await client.query(
        `
        update "Users"
        set "balance" = $1
        where "id" = $2
        returning "balance";
      `,
        [newBalance, id]
      );

      const invoiceNumber = generateInvoice();

      await client.query(
        `
        insert into "Transactions" 
        ("user_id", "service_id", "invoice_number", "transaction_type", "description", "total_amount")
        values ($1, $2, $3, $4, $5, $6)
      `,
        [id, null, invoiceNumber, "TOPUP", "Top Up balance", top_up_amount]
      );

      // ✅ 5. Commit kalau semua berhasil
      await client.query("COMMIT");

      return updateBalance.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async transaction(id, service_code) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const service = await ServiceService.getOneByServiceCode(service_code);

      const balance = await client.query(
        `select u."id", u."balance" from "Users" u where "id" = $1;`,
        [id]
      );

      if (balance.rowCount === 0) {
        throw {
          name: "Not found",
          status: 404,
          message: "Pengguna tidak ditemukan",
        };
      }

      if (service.service_tarif > balance.rows[0].balance) {
        throw {
          name: "Bad request",
          status: 400,
          message: "Saldo tidak cukup",
        };
      }

      const invoice_number = generateInvoice();

      const transaction = await client.query(
        `
        insert into "Transactions" 
        ("user_id", "service_id", "invoice_number", "transaction_type", "description", "total_amount")
        values ($1, $2, $3, $4, $5, $6)
        returning "id";
      `,
        [
          id,
          service.id,
          invoice_number,
          "PAYMENT",
          service.service_name,
          service.service_tarif,
        ]
      );

      const newBalance = balance.rows[0].balance - service.service_tarif;
      await client.query(
        `
        update "Users"
        set "balance" = $1
        where "id" = $2
      `,
        [newBalance, id]
      );

      const result = await client.query(
        `
        select 
          t."invoice_number",
          s."service_code",
          s."service_name",
          t."transaction_type",
          t."total_amount",
          t."created_at"
        from "Transactions" t
        join "Services" s
          on s."id" = t."service_id"
        where t."id" = $1;
      `,
        [transaction.rows[0].id]
      );

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async transactionHistory(id, limit, offset) {
    let query = `
      select 
      "invoice_number",
      "transaction_type",
      "description",
      "total_amount",
      "created_at" AS "created_on"
      from "Transactions"
      where "user_id" = $1
      order by "created_at" DESC
    `;

    let values = [id];

    if (limit) {
      query += ` limit $2 offset $3`;
      values.push(limit, offset);
    }

    const result = await pool.query(query, values);
    return {
      offset,
      limit,
      record: result.rows,
    };
  }
}

module.exports = TransactionService;
