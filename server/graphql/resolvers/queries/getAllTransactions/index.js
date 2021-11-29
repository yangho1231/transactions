const { combineResolvers } = require("graphql-resolvers");
const Transaction = require("../../../../models/Transaction");

module.exports = combineResolvers(async () => {
  const transactions = await Transaction.find();
  return transactions;
});
