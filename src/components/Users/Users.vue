<template>
  <div>
    <div class="hello">
      <AddUser :addUserToList="addUserToList" />
    </div>
    <div v-if="userValue" class="user-table">
      <md-table>
        <md-table-row>
          <md-table-head md-numeric>ID</md-table-head>
          <md-table-head>First Name</md-table-head>
          <md-table-head>Last Name</md-table-head>
          <md-table-head>Edit</md-table-head>
          <md-table-head>Delete</md-table-head>
        </md-table-row>
        <md-table-row :key="user.id" v-for="user in userValue">
          <md-table-cell md-numeric>{{ user.id }}</md-table-cell>
          <md-table-cell>{{ user.firstName }}</md-table-cell>
          <md-table-cell>{{ user.lastName }}</md-table-cell>
          <md-table-cell><md-icon class="fa fa-edit"></md-icon></md-table-cell>
          <md-table-cell @click.native="deleteUser(user.id)"
            ><md-icon class="fa fa-trash"></md-icon
          ></md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import GET_ALL_USERS from "../../graphql/queries/getAllUsers.gql";
import DELETE_USER from "../../graphql/mutations/deleteUser.gql";
import { apolloProvider } from "../../boot/apollo";
import AddUser from "./AddUser";
const apollo = apolloProvider.defaultClient;

export default {
  name: "Users",
  props: {
    msg: String,
  },
  data() {
    return {
      userValue: [],
    };
  },
  created() {
    this.loadUsers();
  },
  components: {
    AddUser,
  },
  methods: {
    addUserToList(user) {
      this.userValue.push(user);
    },
    loadUsers: function() {
      apollo
        .query({
          query: GET_ALL_USERS,
        })
        .then((result) => {
          this.userValue = result.data.getAllUsers;
          return this.userValue;
        });
    },
    async deleteUser(userId) {
      const response = await apollo.mutate({
        mutation: DELETE_USER,
        variables: {
          id: userId,
        },
      });
      this.userValue.forEach((x, index) => {
        if (response.data.deleteUser.id === x.id) {
          this.userValue.splice(index, 1);
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-table {
  padding: 30px;
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
