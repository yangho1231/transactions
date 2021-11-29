<template>
  <div>
    <div class="hello">
      <AddMerchant :addMerchantToList="addMerchantToList" />
    </div>
    <div v-if="merchantValue" class="user-table">
      <md-table>
        <md-table-row>
          <md-table-head md-numeric>ID</md-table-head>
          <md-table-head>Merchant Name</md-table-head>
          <md-table-head>Edit</md-table-head>
          <md-table-head>Delete</md-table-head>
        </md-table-row>
        <md-table-row :key="merchant.id" v-for="merchant in merchantValue">
          <md-table-cell md-numeric>{{ merchant.id }}</md-table-cell>
          <md-table-cell>{{ merchant.merchantName }}</md-table-cell>
          <md-table-cell><md-icon class="fa fa-edit"></md-icon></md-table-cell>
          <md-table-cell @click.native="deleteMerchant(merchant.id)"
            ><md-icon class="fa fa-trash"></md-icon
          ></md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import GET_ALL_MERCHANTS from "../../graphql/queries/getAllMerchants.gql";
import DELETE_MERCHANT from "../../graphql/mutations/deleteMerchant.gql";
import { apolloProvider } from "../../boot/apollo";
import AddMerchant from "./AddMerchant";
const apollo = apolloProvider.defaultClient;

export default {
  name: "Merchants",
  props: {
    msg: String,
  },
  data() {
    return {
      merchantValue: [],
    };
  },
  created() {
    this.loadUsers();
  },
  components: {
    AddMerchant,
  },
  methods: {
    addMerchantToList(merchant) {
      this.merchantValue.push(merchant);
    },
    loadUsers: function() {
      apollo
        .query({
          query: GET_ALL_MERCHANTS,
        })
        .then((result) => {
          this.merchantValue = result.data.getAllMerchants;
          return this.merchantValue;
        });
    },
    async deleteMerchant(merchantId) {
      const response = await apollo.mutate({
        mutation: DELETE_MERCHANT,
        variables: {
          id: merchantId,
        },
      });
      this.merchantValue.forEach((x, index) => {
        if (response.data.deleteMerchant.id === x.id) {
          this.merchantValue.splice(index, 1);
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
