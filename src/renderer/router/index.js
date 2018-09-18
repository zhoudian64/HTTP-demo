import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/components/Index.vue")
    },
    {
      path: "/protocol",
      name: "protocol",
      component: () => import("@/components/Protocol.vue")
    },
    {
      path: "/security",
      name: "security",
      component: () => import("@/components/Security.vue")
    },
    {
      path: "/application",
      name: "application",
      component: () => import("@/components/Application.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
