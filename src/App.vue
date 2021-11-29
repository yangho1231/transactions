<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="nav">
      <router-link to="/">Titles</router-link> |
      <router-link to="/Users">Users</router-link> |
      <router-link to="/Merchants">Merchants</router-link> |
      <router-link to="/Categories">Categories</router-link> |
      <router-link to="/Transactions">Transactions</router-link> |
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
