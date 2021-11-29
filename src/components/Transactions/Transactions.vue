<template>
  <div>
    <div
      v-if="merchantExist && userExist && categoryExist"
      class="transaction-container"
    >
      <AddTransaction
        :reloadTransactions="reloadTransactions"
        :merchants="merchants"
        :categories="categories"
        :users="users"
      />
    </div>
    <div v-if="!merchantExist">
      <h1>Please create merchant</h1>
    </div>
    <div v-if="!userExist">
      <h1>Please create user</h1>
    </div>
    <div v-if="!categoryExist">
      <h1>Please create category</h1>
    </div>
    <Chart v-if="transactions" :transactions="transactions" />
    <div v-if="transactions.length > 0" class="user-table">
      <md-table>
        <md-table-row>
          <md-table-head md-numeric>ID</md-table-head>
          <md-table-head>Description</md-table-head>
          <md-table-head>Amount</md-table-head>
          <md-table-head>Credit</md-table-head>
          <md-table-head>Debit</md-table-head>
          <md-table-head>Username</md-table-head>
          <md-table-head>Merchantname</md-table-head>
          <md-table-head>Category</md-table-head>
        </md-table-row>
        <md-table-row :key="transaction.id" v-for="transaction in transactions">
          <md-table-cell md-numeric>{{ transaction.id }}</md-table-cell>
          <md-table-cell>{{ transaction.amount }}</md-table-cell>
          <md-table-cell>{{ transaction.description }}</md-table-cell>
          <md-table-cell>{{ transaction.credit }}</md-table-cell>
          <md-table-cell>{{ transaction.debit }}</md-table-cell>
          <md-table-cell>{{ transaction.user.firstName }}</md-table-cell>
          <md-table-cell>{{ transaction.merchant.merchantName }}</md-table-cell>
          <md-table-cell>{{ transaction.category.categoryName }}</md-table-cell>
          <md-table-cell><md-icon class="fa fa-edit"></md-icon></md-table-cell>
          <md-table-cell @click.native="deleteTransaction(transaction.id)"
            ><md-icon class="fa fa-trash"></md-icon
          ></md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import GET_ALL_TRANSACTIONS from "../../graphql/queries/getAllTransactions.gql";
import GET_ALL_CATEGORIES from "../../graphql/queries/getAllCategories.gql";
import GET_ALL_MERCHANTS from "../../graphql/queries/getAllMerchants.gql";
import GET_ALL_USERS from "../../graphql/queries/getAllUsers.gql";
import DELETE_TRANSACTION from "../../graphql/mutations/deleteTransaction.gql";
import { apolloProvider } from "../../boot/apollo";
import AddTransaction from "./AddTransaction";
import Chart from "./Chart";
const apollo = apolloProvider.defaultClient;

export default {
  name: "Transactions",
  props: {
    msg: String,
  },
  data() {
    return {
      transactions: [],
      merchants: [],
      users: [],
      categories: [],
      categoryExist: false,
      userExist: false,
      merchantExist: false,
    };
  },
  created() {
    this.loadTransactions();
    this.loadMerchants();
    this.loadCategories();
    this.loadUsers();
  },
  components: {
    AddTransaction,
    Chart,
  },
  methods: {
    checkIfDataExist() {
      if (this.categories.length > 0) {
        this.categoryExist = true;
      }
      if (this.users.length > 0) {
        this.userExist = true;
      }
      if (this.merchants.length > 0) {
        this.merchantExist = true;
      }
    },
    reloadTransactions(result) {
      this.transactions.push(result);
    },
    loadTransactions: function() {
      apollo
        .query({
          query: GET_ALL_TRANSACTIONS,
        })
        .then((result) => {
          this.transactions = result.data.getAllTransactions;
          return this.transactions;
        });
    },
    loadMerchants: function() {
      apollo
        .query({
          query: GET_ALL_MERCHANTS,
        })
        .then((result) => {
          this.merchants = result.data.getAllMerchants;
          this.checkIfDataExist();

          return this.merchants;
        });
    },
    loadUsers: function() {
      apollo
        .query({
          query: GET_ALL_USERS,
        })
        .then((result) => {
          this.users = result.data.getAllUsers;
          this.checkIfDataExist();

          return this.users;
        });
    },
    loadCategories: function() {
      apollo
        .query({
          query: GET_ALL_CATEGORIES,
        })
        .then((result) => {
          this.categories = result.data.getAllCategories;
          this.checkIfDataExist();

          return this.categories;
        });
    },
    async deleteTransaction(id) {
      const response = await apollo.mutate({
        mutation: DELETE_TRANSACTION,
        variables: {
          id: id,
        },
      });
      this.transactions.forEach((x, index) => {
        if (response.data.deleteTransaction.id === x.id) {
          this.transactions.splice(index, 1);
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
