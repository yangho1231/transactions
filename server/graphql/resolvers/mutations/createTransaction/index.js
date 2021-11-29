const { combineResolvers } = require("graphql-resolvers");
const Transaction = require("../../../../models/Transaction");
const Category = require("../../../../models/Category");
const Merchant = require("../../../../models/Merchant");
const User = require("../../../../models/User");

module.exports = combineResolvers(
  async (
    _,
    { amount, description, debit, credit, userId, categoryId, merchantId }
  ) => {
    const merchant = await Merchant.findById(merchantId);

    const user = await User.findById(userId);
    const category = await Category.findById(categoryId);

    const transaction = await new Transaction({
      amount,
      description,
      debit,
      credit,
      userId,
      categoryId,
      merchantId,
      merchant: {
        id: merchant.id,
        merchantName: merchant.merchantName,
      },
      category: {
        id: category.id,
        categoryName: category.categoryName,
      },
      user: {
        id: user.id,
        firstName: user.firstName,
      },
    });
    transaction.save();
    return transaction;
  }
);
