import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/about",
      component: () => import(/* webpackChunkName: 'about' */ "./views/About"),
    },
  ],
});
