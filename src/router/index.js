import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Users from "../components/Users/Users.vue";
import Merchants from "../components/Merchants/Merchants.vue";
import Categories from "../components/Categories/Categories.vue";
import Transactions from "../components/Transactions/Transactions.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Users",
    name: "Users",
    component: Users,
  },
  {
    path: "/Merchants",
    name: "Merchants",
    component: Merchants,
  },
  {
    path: "/Categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/Transactions",
    name: "Transactions",
    component: Transactions,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
