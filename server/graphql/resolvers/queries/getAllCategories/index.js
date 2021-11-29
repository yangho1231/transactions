const { combineResolvers } = require("graphql-resolvers");
const Category = require("../../../../models/Category");

module.exports = combineResolvers(async () => {
  const categories = await Category.find();
  return categories;
});
