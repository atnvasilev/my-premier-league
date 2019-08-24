import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import firebase from 'firebase/app'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

const firebaseConfig = {
  apiKey: "AIzaSyCuCDIRL2e-zL9Q7AGwrhrMQa7ynqOs0MY",
  authDomain: "my-premier-league-e2745.firebaseapp.com",
  databaseURL: "https://my-premier-league-e2745.firebaseio.com",
  projectId: "my-premier-league-e2745",
  storageBucket: "my-premier-league-e2745.appspot.com",
  messagingSenderId: "442164213862",
  appId: "1:442164213862:web:8121a3050c3a1f4c"
};

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

