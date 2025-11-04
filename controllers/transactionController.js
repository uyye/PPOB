const TransactionService = require("../services/transacationService");

class TransactionController {
  static async topUp(req, res, next) {
    try {
      const { top_up_amount } = req.body;

      const data = await TransactionService.topUp(req.user.id, top_up_amount);
      res.status(200).json({
        status: 200,
        message: "Top Up Balance berhasil",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async transaction(req, res, next) {
    try {
      const { service_code } = req.body;
      const data = await TransactionService.transaction(
        req.user.id,
        service_code
      );
      res.status(200).json({
        status: 200,
        message: "Transaksi berhasil",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async transactionHistory(req, res, next) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : null;
      const offset = req.query.offset ? parseInt(req.query.offset) : 0;

      const data = await TransactionService.transactionHistory(req.user.id, limit, offset);
      res.status(200).json({
        status:200,
        message: "Get History Berhasil",
        data
      })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = TransactionController;
