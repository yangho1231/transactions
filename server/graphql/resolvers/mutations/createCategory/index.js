const { combineResolvers } = require("graphql-resolvers");
const Category = require("../../../../models/Category");

module.exports = combineResolvers(async (_, { categoryName }) => {
  const category = await new Category({ categoryName });
  category.save();
  return category;
});
