const { combineResolvers } = require("graphql-resolvers");
const User = require("../../../../models/User");

module.exports = combineResolvers(async (_, { firstName, lastName }) => {
  const user = await new User({ firstName, lastName });
  user.save();
  return user;
});
