import Vue from "vue";
import Router from "vue-router";
import Schedule from "./pages/PageSchedule";
import Login from "./pages/PageLogin";
import Standings from "./pages/PageStandings";
import Team from "./pages/PageTeam";
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
    },
    {
      path: "/team/:id",
      name: "Team",
      component: Team
    }
  ],

  mode: "history"
});

export default router;
