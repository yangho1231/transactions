<template>
  <div class="hello">
    <md-field>
      <label>Firstname</label>
      <md-input v-model="firstName"></md-input>
    </md-field>
    <md-field>
      <label>Lastname</label>
      <md-input v-model="lastName"></md-input>
    </md-field>
    <md-button
      class="md-raised md-primary"
      v-on:click="loadUsers(lastName, lastName)"
      >Add User</md-button
    >
  </div>
</template>

<script>
import { apolloProvider } from "../../../boot/apollo";
const apollo = apolloProvider.defaultClient;
import CREATE_USER from "../../../graphql/mutations/createUser.gql";

export default {
  name: "AddUser",
  props: {
    addUserToList: Function,
  },
  data() {
    return {
      firstName: "testFirst",
      lastName: "testLast",
    };
  },
  methods: {
    async loadUsers(firstName, lastName) {
      const response = await apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          firstName,
          lastName,
        },
      });
      this.addUserToList(response.data.createUser);
      return response.data.createUser;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  justify-content: center;
  align-item: center;
}
.md-field {
  width: 10%;
}
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
