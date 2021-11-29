<template>
  <div>
    <div class="hello">
      <AddCategory :addCategoryToList="addCategoryToList" />
    </div>
    <div v-if="categoryValue" class="user-table">
      <md-table>
        <md-table-row>
          <md-table-head md-numeric>ID</md-table-head>
          <md-table-head>Category Name</md-table-head>
          <md-table-head>Edit</md-table-head>
          <md-table-head>Delete</md-table-head>
        </md-table-row>
        <md-table-row :key="category.id" v-for="category in categoryValue">
          <md-table-cell md-numeric>{{ category.id }}</md-table-cell>
          <md-table-cell>{{ category.categoryName }}</md-table-cell>
          <md-table-cell><md-icon class="fa fa-edit"></md-icon></md-table-cell>
          <md-table-cell @click.native="deleteCategory(category.id)"
            ><md-icon class="fa fa-trash"></md-icon
          ></md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import GET_ALL_CATEGORIES from "../../graphql/queries/getAllCategories.gql";
import DELETE_CATEGORY from "../../graphql/mutations/deleteCategory.gql";
import { apolloProvider } from "../../boot/apollo";
import AddCategory from "./AddCategory";
const apollo = apolloProvider.defaultClient;

export default {
  name: "Categories",
  props: {
    msg: String,
  },
  data() {
    return {
      categoryValue: [],
    };
  },
  created() {
    this.loadUsers();
  },
  components: {
    AddCategory,
  },
  methods: {
    addCategoryToList(category) {
      this.categoryValue.push(category);
    },
    loadUsers: function() {
      apollo
        .query({
          query: GET_ALL_CATEGORIES,
        })
        .then((result) => {
          this.categoryValue = result.data.getAllCategories;
          return this.categoryValue;
        });
    },
    async deleteCategory(categoryId) {
      const response = await apollo.mutate({
        mutation: DELETE_CATEGORY,
        variables: {
          id: categoryId,
        },
      });
      this.categoryValue.forEach((x, index) => {
        if (response.data.deleteCategory.id === x.id) {
          this.categoryValue.splice(index, 1);
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
