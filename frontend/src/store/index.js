import Vue from 'vue'
import Vuex from 'vuex'
import axios, { URL } from '../utils/config'
import { actions, mutations, getters } from './types'
// axiosInstance.defaults.headers.post['Accepts'] = 'application/json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: false,
    type: '',
    user: {
      token: '',
      userType: '',
      name: '',
      surname: '',
      username: '',
      email: '',
      balance: '',
    },
  },
  mutations: {
    [mutations.SET_USER_DETAILS](state, { user }) {
      state.user = user
    },
    [mutations.SET_USER_TYPE](state, { type }) {
      state.type = type
    },
    [mutations.SET_SIGN_IN](state, { token }) {
      // Alter defaults after instance has been created
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      state.signedIn = true
    },
    [mutations.LOG_OUT](state) {
      state.token = ''
      state.signedIn = false
      axios.defaults.headers.common['Authorization'] = `Bearer 1`
    },
  },
  actions: {
    async [actions.SIGN_IN]({ commit, state }, { userType, email, password }) {
      // if (mock?.should) {
      //   mock
      // }
      try {
        const response = await axios.post(URL.LOGIN, {
          userType,
          email,
          password,
        })
        const { data } = response
        commit(mutations.SET_USER_DETAILS, data)
        commit(mutations.SET_SIGN_IN, { token: data.token })
        commit(mutations.SET_USER_TYPE, { token: data.userType })
      } catch (error) {
        // todo set error
        // cannot login
      }
    },
    async [actions.SIGN_UP]({ commit, state }, {}) {
      try {
        const response = await axios.post(URL.SIGNUP, {})
      } catch (error) {}
    },
  },
  modules: {},
})
