<template>
  <div class="hello">
    <md-field>
      <label>Category Name</label>
      <md-input v-model="categoryName"></md-input>
    </md-field>
    <md-button
      class="md-raised md-primary"
      v-on:click="loadCategories(categoryName)"
      >Add Category</md-button
    >
  </div>
</template>

<script>
import { apolloProvider } from "../../../boot/apollo";
const apollo = apolloProvider.defaultClient;
import CREATE_CATEGORY from "../../../graphql/mutations/createCategory.gql";

export default {
  name: "AddCategory",
  props: {
    addCategoryToList: Function,
  },
  data() {
    return {
      categoryName: "testFirst",
    };
  },
  methods: {
    async loadCategories(categoryName) {
      console.log("clicked", categoryName);
      const response = await apollo.mutate({
        mutation: CREATE_CATEGORY,
        variables: {
          categoryName,
        },
      });
      console.log(response);
      this.addCategoryToList(response.data.createCategory);
      return response.data.createCategory;
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
