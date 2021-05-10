import Vue from 'vue'
import Vuex from 'vuex'
import axios, { URL } from '../utils/config'
import {
  SET_USER_DETAILS,
  SIGN_IN,
  LOG_OUT,
  SET_TOKEN,
  SET_USER_TYPE,
} from './types'
// axiosInstance.defaults.headers.post['Accepts'] = 'application/json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    signedIn: false,
    type: '',
    user: {
      name: '',
      surname: '',
      username: '',
      email: '',
      balance: '',
    },
  },
  mutations: {
    [SET_USER_DETAILS](state, { user }) {
      state.user = user
    },
    [SET_USER_TYPE](state, { type }) {
      state.type = type
    },
    [SIGN_IN](state) {
      // Alter defaults after instance has been created
      axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
      state.signedIn = true
    },
    [LOG_OUT](state) {
      state.token = ''
      state.signedIn = false
    },
    [SET_TOKEN](state, { token }) {
      state.token = token
    },
  },
  actions: {
    async signIn({ commit, state }, { mock, userType, email, password }) {
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
        data.
      } catch (error) {
        // todo set error
        // cannot login
      }
    },
  },
  modules: {},
})
