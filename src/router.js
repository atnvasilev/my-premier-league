import Vue from "vue";
import store from "@/store";
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
      component: Schedule,
      meta: { requiresAuth: true }
    },
    {
      path: "/home",
      name: "Home",
      component: Schedule,
      meta: { requiresAuth: true }
    },
    {
      path: "/standings",
      name: "Standings",
      component: Standings,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: "/logout",
      name: "Logout",
      meta: { requiresAuth: true },
      beforeEnter(to, from, next) {
        store.dispatch("signOut").then(() => next({ name: "Home" }));
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: "/team/:id",
      name: "Team",
      component: Team,
      meta: { requiresAuth: true }
    },
    {
      path: "/match/:id",
      name: "Statistics",
      component: Statistics,
      meta: { requiresAuth: true }
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ],

  mode: "history"
});

router.beforeEach((to, from, next) => {
  store.dispatch("initAuthentication").then(user => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      // protected route
      if (user) {
        next();
      } else {
        next({ name: "Login" });
      }
    } else if (to.matched.some(route => route.meta.requiresGuest)) {
      // protected route
      if (!user) {
        next();
      } else {
        next({ name: "Home" });
      }
    } else {
      next();
    }
  });
});

export default router;
