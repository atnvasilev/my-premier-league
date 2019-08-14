<template>
  <div id="app">
    <TheHeader />
    <router-view v-show="showPage" @ready="pageReady" />
    <AppLoading v-show="!showPage" />
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import AppLoading from "./components/AppLoading";
export default {
  name: "app",
  components: {
    TheHeader,
    AppLoading
  },
  data() {
    return {
      showPage: false
    };
  },
  methods: {
    pageReady() {
      this.showPage = true;
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false;
      next();
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
