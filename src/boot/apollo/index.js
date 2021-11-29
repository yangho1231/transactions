import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4005/graphql",
  // Set some default options since we don't want to use the Apollo cache at all
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
