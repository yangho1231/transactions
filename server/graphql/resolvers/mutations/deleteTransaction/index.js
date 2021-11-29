const { combineResolvers } = require("graphql-resolvers");
const Transaction = require("../../../../models/Transaction");

module.exports = combineResolvers(async (_, { id }) => {
  const transaction = await Transaction.findByIdAndDelete(id);
  return transaction;
});
