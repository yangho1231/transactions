const { combineResolvers } = require("graphql-resolvers");
const Category = require("../../../../models/Category");

module.exports = combineResolvers(async (_, { id }) => {
  const category = await Category.findByIdAndDelete(id);
  return category;
});
