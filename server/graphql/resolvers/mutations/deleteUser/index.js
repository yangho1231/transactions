const { combineResolvers } = require("graphql-resolvers");
const User = require("../../../../models/User");

module.exports = combineResolvers(async (_, { id }) => {
  const user = await User.findByIdAndDelete(id);
  return user;
});
