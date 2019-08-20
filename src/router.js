import Vue from "vue";
import Router from "vue-router";
import Schedule from "./pages/PageSchedule";
import Login from "./pages/PageLogin";
import Register from "./pages/PageRegister";
import Standings from "./pages/PageStandings";
import Team from "./pages/PageTeam";
import Statistics from "./pages/PageMatchStatistics";
import NotFound from "./pages/PageNotFound";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Schedule",
      component: Schedule
    },
    {
      path: "/home",
      name: "Home",
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
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/team/:id",
      name: "Team",
      component: Team
    },
    {
      path: "/match/:id",
      name: "Statistics",
      component: Statistics
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ],

  mode: "history"
});

export default router;
