import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        authId: null,
        unsubscribeAuthObserver: null
    },

    getters: {
        authUser (state) {
            return state.authId ? state.users[state.authId] : null
        }
    },
    actions: {/* eslint-disable */

        fetchAuthUser ({dispatch, commit}) {
            const userId = firebase.auth().currentUser.uid
            return new Promise((resolve, reject) => {
              firebase.database().ref('users').child(userId).once('value', snapshot => {
                if (snapshot.exists()) {
                  return dispatch('fetchUser', {id: userId})
                    .then((user) => {
                      commit('setAuthId', userId)
                      resolve(user)
                    })
                } else {
                  resolve(null)
                }
              })
            })
          },
        
          fetchUser: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'users', id}),
        
          fetchItem ({state, commit}, {id, resource}) {
            return new Promise((resolve, reject) => {
              firebase.database().ref(resource).child(id).once('value', snapshot => {
                commit('setItem', {resource, id: snapshot.key, item: snapshot.val()})
                resolve(state[resource][id])
              })
            })
          },
        
          fetchItems ({dispatch}, {ids, resource}) {
            ids = Array.isArray(ids) ? ids : Object.keys(ids)
            return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource, ids})))
          },
        
          createUser ({state, commit}, {id, name, username, email, password, avatar = null}) {
            return new Promise((resolve, reject) => {
              const registeredAt = Math.floor(Date.now() / 1000)
              const usernameLower = username.toLowerCase()
              email = email.toLowerCase()
              const user = {name, username, email, usernameLower, registeredAt, password, avatar}
              firebase.database().ref('users').child(id).set(user)
                .then(() => {
                  commit('setItem', {resource: 'users', item: user, id: id})
                  resolve(state.users[id])
                })
            })
          },
        
          registerUserWithEmailAndPssword ({dispatch}, {email, name, username, password, avatar = null}) {
            return firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(({user}) => {
                return dispatch('createUser', {id: user.uid, email, name, username, password, avatar})
              })
              .then(() => {
                dispatch('fetchAuthUser')
              })
          },
          signInWithEmailAndPassword ({}, {email, password}) {
            return firebase.auth().signInWithEmailAndPassword(email, password)
          },
        
        initAuthentication ({dispatch, commit, state}) {
            return new Promise((resolve, reject) => {
              if (state.unsubscribeAuthObserver) {
                state.unsubscribeAuthObserver()
              }
        
              const unsubscribe = firebase.auth().onAuthStateChanged(user => {
                if (user) {
                  dispatch('fetchAuthUser')
                    .then((dbUser) => resolve(dbUser))
                } else {
                  resolve(null)
                }
              })
              commit('setUnsubscribeAuthObserver', unsubscribe)
            })
          },
        
          logout ({commit}) {
            return firebase.auth().signOut()
              .then(() => {
                commit('setAuthId', null)
              })
          }

        // createUser ({state, commit}, {id, email, password}) {
        //     return new Promise((resolve, reject) => {
        //       email = email.toLowerCase()
        //       const user = {email, password}
        //       firebase.database().ref('users').child(id).set(user)
        //         .then(() => {
        //           commit('setItem', {resource: 'users', item: user, id: id})
        //           resolve(user)
        //         })
        //     })
        // },
        
        // registerUserWithEmailAndPassword ({dispatch}, {email, password}) {
        //     return firebase.auth().createUserWithEmailAndPassword(email, password)
        //         .then(({user}) => {
        //             return dispatch('createUser', {id: user.uid, email, password})
        //         })
        //         .then(() => {
        //             dispatch('fetchAuthUser')
        //         })
        // },
        // signInWithEmailAndPassword ({}, {email, password}) {
        //     return firebase.auth().signInWithEmailAndPassword(email, password)
        // },

        // fetchAuthUser ({dispatch, commit}) {
        //     const userId = firebase.auth().currentUser.uid
        //     return new Promise((resolve) => {
        //         firebase.database().ref('users').child(userId).once('value', snapshot => {
        //         if (snapshot.exists()) {
        //             return dispatch('fetchUser', {id: userId})
        //             .then((user) => {
        //                 commit('setAuthId', userId)
        //                 resolve(user)
        //             })
        //         } else {
        //             resolve(null)
        //         }
        //         })
        //     });
        // },
        // logout ({commit}) {
        //     return firebase.auth().signOut()
        //         .then(() => {
        //         commit('setAuthId', null)
        //     })
        // },
        // fetchUser ({commit}, {id}) {
        //     return new Promise((resolve, reject) => {
        //         if(id !== null) {
        //             firebase.database().ref('users').child(id).once('value', snapshot => {
        //                 commit('setAuthId', snapshot.key)
        //                 resolve(snapshot.key)
        //             })
        //         }
        //         reject('No user found')
        //     })
        // },
        // initAuthentication ({dispatch, commit, state}) {
        //     return new Promise((resolve, reject) => {
        //       if (state.unsubscribeAuthObserver) {
        //         state.unsubscribeAuthObserver()
        //       }
        
        //       const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        //         if (user) {
        //           dispatch('fetchAuthUser')
        //             .then((dbUser) => resolve(dbUser))
        //         } else {
        //           resolve(null)
        //         }
        //       })
        //       commit('setUnsubscribeAuthObserver', unsubscribe)
        //     })
        // }
    },
    mutations: {
        setItem (state, {item, id, resource}) {
            item['.key'] = id
            Vue.set(state[resource], id, item)
          },
            setUser (state, {userId, user}) {
            Vue.set(state.users, userId, user)
          },
        
          setAuthId (state, id) {
            state.authId = id
          },
        
          setUnsubscribeAuthObserver (state, unsubscribe) {
            state.unsubscribeAuthObserver = unsubscribe
          }
        // setUnsubscribeAuthObserver (state, unsubscribe) {
        //     state.unsubscribeAuthObserver = unsubscribe
        // },
        // setAuthId (state, id) {
        //     state.authId = id
        // },
        // setItem (state, {item, id, resource}) {
        //     item['.key'] = id
        //     Vue.set(state[resource], id, item)
        // },
    }
});