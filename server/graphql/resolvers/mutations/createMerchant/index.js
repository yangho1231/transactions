const { combineResolvers } = require("graphql-resolvers");
const Merchant = require("../../../../models/Merchant");

module.exports = combineResolvers(async (_, { merchantName }) => {
  const merchant = await new Merchant({ merchantName });
  merchant.save();
  return merchant;
});
