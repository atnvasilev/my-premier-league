import firebase from "firebase";
export default {
  createUser({ state, commit }, { id, email, password }) {
    return new Promise(resolve => {
      email = email.toLowerCase();
      const user = { email, password };
      firebase
        .database()
        .ref("users")
        .child(id)
        .set(user)
        .then(() => {
          commit("setItem", { resource: "users", item: user, id: id });
          resolve(state.users[id]);
        });
    });
  },

  registerUserWithEmailAndPssword({ dispatch }, { email, password }) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        return dispatch("createUser", { id: user.uid, email, password });
      })
      .then(() => {
        dispatch("fetchAuthUser");
      });
  },

  fetchAuthUser({ dispatch, commit }) {
    const userId = firebase.auth().currentUser.uid;
    return new Promise(resolve => {
      firebase
        .database()
        .ref("users")
        .child(userId)
        .once("value", snapshot => {
          if (snapshot.exists()) {
            return dispatch("fetchUser", { id: userId }).then(user => {
              commit("setAuthId", userId);
              resolve(user);
            });
          } else {
            resolve(null);
          }
        });
    });
  },
  fetchUser: ({ dispatch }, { id }) =>
    dispatch("fetchItem", { resource: "users", id }),
  fetchItem({ state, commit }, { id, resource }) {
    return new Promise(resolve => {
      firebase
        .database()
        .ref(resource)
        .child(id)
        .once("value", snapshot => {
          commit("setItem", {
            resource,
            id: snapshot.key,
            item: snapshot.val()
          });
          resolve(state[resource][id]);
        });
    });
  },
  // eslint-disable-next-line no-empty-pattern
  signInWithEmailAndPassword({}, { email, password }) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  initAuthentication({ dispatch, commit, state }) {
    return new Promise(resolve => {
      if (state.unsubscribeAuthObserver) {
        state.unsubscribeAuthObserver();
      }

      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch("fetchAuthUser").then(dbUser => resolve(dbUser));
        } else {
          resolve(null);
        }
      });
      commit("setUnsubscribeAuthObserver", unsubscribe);
    });
  },
  logout({ commit }) {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setAuthId", null);
      });
  }
};
