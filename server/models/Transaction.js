const mongoose = require("mongoose");

const Transaction = mongoose.model("Transaction", {
  amount: String,
  description: String,
  debit: Boolean,
  credit: Boolean,
  userId: String,
  merchantId: String,
  categoryId: String,
  merchant: Object,
  user: Object,
  category: Object,
});

module.exports = Transaction;
