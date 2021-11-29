const { combineResolvers } = require("graphql-resolvers");
const Merchant = require("../../../../models/Merchant");

module.exports = combineResolvers(async (_, { id }) => {
  const merchant = await Merchant.findByIdAndDelete(id);
  return merchant;
});
