import Vue from "vue";
import Router from "vue-router";
import Schedule from "./pages/PageSchedule";
import Login from "./pages/PageLogin";
import Standings from "./pages/PageStandings";
Vue.use(Router);

const router = new Router({
  routes: [
    {
        path: "/",
        name: "Schedule",
        component: Schedule
      },
      {
        path: "/standings",
        name: "Standings",
        component: Standings
      },
      {
        path: "/login",
        name: "Login",
        component: Login
      }
  ],

  mode: "history"
});

export default router;
