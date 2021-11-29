const { combineResolvers } = require("graphql-resolvers");
const Merchant = require("../../../../models/Merchant");

module.exports = combineResolvers(async () => {
  const merchants = await Merchant.find();
  return merchants;
});
