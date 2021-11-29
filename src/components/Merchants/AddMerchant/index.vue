<template>
  <div class="hello">
    <md-field>
      <label>Merchant Name</label>
      <md-input v-model="merchantName"></md-input>
    </md-field>
    <md-button
      class="md-raised md-primary"
      v-on:click="loadMerchants(merchantName)"
      >Add Merchant</md-button
    >
  </div>
</template>

<script>
import { apolloProvider } from "../../../boot/apollo";
const apollo = apolloProvider.defaultClient;
import CREATE_MERCHANT from "../../../graphql/mutations/createMerchant.gql";

export default {
  name: "AddMerchant",
  props: {
    addMerchantToList: Function,
  },
  data() {
    return {
      merchantName: "testFirst",
    };
  },
  methods: {
    async loadMerchants(merchantName) {
      console.log("clicked", merchantName);
      const response = await apollo.mutate({
        mutation: CREATE_MERCHANT,
        variables: {
          merchantName,
        },
      });
      console.log(response);
      this.addMerchantToList(response.data.createMerchant);
      return response.data.createMerchant;
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
