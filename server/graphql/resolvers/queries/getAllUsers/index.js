const { combineResolvers } = require("graphql-resolvers");
const User = require("../../../../models/User");

module.exports = combineResolvers(async () => {
  const users = await User.find();
  return users;
});
