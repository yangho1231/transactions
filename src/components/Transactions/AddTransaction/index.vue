<template>
  <div class="hello">
    <md-field>
      <label>Description</label>
      <md-input v-model="description"></md-input>
    </md-field>
    <md-field>
      <label>Amount</label>
      <md-input v-model="amount"></md-input>
    </md-field>
    <div>
      <md-radio v-model="radio" value="true">Credit</md-radio>
      <md-radio v-model="radio" value="false">Debit</md-radio>
    </div>
    <md-field>
      <label>Merchant</label>
      <md-select v-model="merchantId" name="merchant">
        <md-option
          v-for="merchant in merchants"
          v-bind:key="merchant.id"
          :value="merchant.id"
          >{{ merchant.merchantName }}</md-option
        >
      </md-select>
    </md-field>
    <md-field>
      <label>User</label>
      <md-select v-model="userId" name="user">
        <md-option
          v-for="user in users"
          v-bind:key="user.id"
          :value="user.id"
          >{{ user.firstName }}</md-option
        >
      </md-select>
    </md-field>
    <md-field>
      <label>Category</label>
      <md-select v-model="categoryId" name="category">
        <md-option
          v-for="category in categories"
          v-bind:key="category.id"
          :value="category.id"
          >{{ category.categoryName }}</md-option
        >
      </md-select>
    </md-field>
    <md-button
      class="md-raised md-primary"
      v-on:click="
        loadTransaction(
          description,
          amount,
          radio,
          userId,
          merchantId,
          categoryId
        )
      "
      >Add User</md-button
    >
  </div>
</template>

<script>
import { apolloProvider } from "../../../boot/apollo";
const apollo = apolloProvider.defaultClient;
import CREATE_TRANSACTION from "../../../graphql/mutations/createTransaction.gql";

export default {
  name: "AddUser",
  props: {
    reloadTransactions: Function,
    users: Array,
    merchants: Array,
    categories: Array,
  },
  data() {
    return {
      description: "",
      amount: "",
      radio: "true",
      userId: "",
      merchantId: "",
      categoryId: "",
      credit: true,
      debit: false,
    };
  },
  methods: {
    async loadTransaction(
      description,
      amount,
      radio,
      userId,
      merchantId,
      categoryId
    ) {
      if (radio === "true") {
        this.credit = true;
        this.debit = false;
      } else {
        this.credit = false;
        this.debit = true;
      }
      const response = await apollo.mutate({
        mutation: CREATE_TRANSACTION,
        variables: {
          description,
          amount,
          credit: this.credit,
          debit: this.debit,
          userId,
          merchantId,
          categoryId,
        },
      });

      if (response) {
        this.reloadTransactions(response.data.createTransaction);
      }
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
