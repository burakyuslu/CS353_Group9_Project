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
      userId: '',
      userType: '',
      name: '',
      surname: '',
      username: '',
      email: '',
      balance: '',
    },
    courseDetails: [],
    courseList: [],
    studentProfileData: {},
    studentNotifications: [],
  },
  getters: {
    [getters.GET_COURSES_STUDENT_HOME]: state => {
      return state.courseList
    },
    [getters.GET_STUDENT_PROFILE_DATA]: state => {
      return state.studentProfileData
    },
    [getters.GET_STUDENT_NOTIFICATIONS]: state => {
      return state.studentNotifications
    },
  },
  mutations: {
    [mutations.SET_USER_DETAILS](state, { data }) {
      state.user = data
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
    [mutations.SET_COURSE_LIST](state, { data }) {
      state.courseList = data
    },
    [mutations.SET_STUDENT_PROFILE_DATA](state, { data }) {
      state.studentProfileData = data
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
    // fetches the 'home page' unowned courses...
    async [actions.FETCH_COURSE_LIST]({ commit, state }, payload) {
      try {
        const response = await axios.get(URL.COURSE_LIST)
        const { data } = response
        commit(mutations.SET_COURSE_LIST, { data })
      } catch (error) {
        // todo set error
        // cannot login
        console.log(error)
      }
    },

    async [actions.FETCH_USER_PROFILE_DATA]({ commit, state }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const { data } = await axios.get(URL.USER_STUDENT_PROFILE_DATA, {
          params: { studentId: state.user.userId },
        })
        commit(mutations.SET_STUDENT_PROFILE_DATA, { data })
      } catch (error) {
        // todo set error
        // cannot login
        console.log(error)
      }
    },

    async [actions.UNWISH_COURSE]({ commit, state }, {courseId}) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const { data } = await axios.delete(URL.USER_STUDENT_WISH_COURSE, {
          data: {courseId},
          params: { studentId: state.user.userId },
        })
        commit(mutations.SET_STUDENT_PROFILE_DATA, { data })
      } catch (error) {
        // todo set error
        // cannot login
        console.log(error)
      }
    },
  },
  modules: {},
})
