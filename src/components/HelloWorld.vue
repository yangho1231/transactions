<template>
  <div class="hello">
    <button v-on:click="testFunction">OnClick</button>
  </div>
</template>

<script>
import GET_ALL_USERS from "../graphql/queries/getAllUsers.gql";
import { apolloProvider } from "../boot/apollo";
const apollo = apolloProvider.defaultClient;

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    testFunction: function() {
      apollo.query({
        query: GET_ALL_USERS,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
