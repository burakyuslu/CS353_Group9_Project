import Vue from 'vue'
import Vuex from 'vuex'
import axios, { URL } from '../utils/config'
import { actions, getters, mutations } from './types'
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
    studentsCourseDetails: {},
    courseList: [],
    studentProfileData: {},
    studentNotifications: [],
    courseRating: {},
    lectureContent: {},
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
    [getters.GET_STUDENT_COURSE_DETAILS]: state => {
      return state.studentsCourseDetails
    },
    getLectureContent(state) {
      return state.lectureContent
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
    [mutations.SET_STUDENT_COURSE_DETAILS](state, { data }) {
      state.studentsCourseDetails = data
    },
    setLectureContent(state, { data }) {
      state.lectureContent = data
    },
    setThreadEntries(state, { threadIndex, entries }) {
      state.lectureContent.qna[threadIndex].entries = entries
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
        commit(mutations.SET_USER_TYPE, { type: data.userType })
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
        const response = await axios.get(URL.COURSE_LIST, {
          params: { ...payload },
        })
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

    async [actions.UNWISH_COURSE]({ commit, state }, { courseId }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const { data } = await axios.delete(URL.USER_STUDENT_WISH_COURSE, {
          data: { courseId },
          params: { studentId: state.user.userId },
        })
      } catch (error) {
        // todo set error
        // cannot login
        console.log(error)
      }
    },
    async [actions.REQUEST_REFUND]({ commit, state }, { courseId }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const { data } = await axios.delete(URL.USER_STUDENT_WISH_COURSE, {
          data: { courseId },
          params: { studentId: state.user.userId },
        })
        commit(mutations.SET_STUDENT_PROFILE_DATA, { data })
      } catch (error) {
        // todo set error
        // cannot login
        console.log(error)
      }
    },
    async [actions.FETCH_COURSE_DETAILS]({ commit, state }, { courseId }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const { data } = await axios.get(`${URL.COURSE_LIST}/${courseId}`, {
          params: { studentId: state.user.userId },
        })
        commit(mutations.SET_STUDENT_COURSE_DETAILS, {
          data,
        })
      } catch (error) {
        // todo set error
        // cannot login
        console.log(error)
      }
    },
    async addToWishlist({ commit, state }, { courseId }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const { data } = await axios.post(`${URL.USER_WISHLIST}`, {
          courseId,
          studentId: state.user.userId,
        })
      } catch (error) {
        // todo set error
        // cannot login
        console.log(error)
      }
    },
    async buyCourse({ commit, state }, { courseId }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const { data } = await axios.post('payments/checkouts', {
          studentId: state.user.userId,
          courseId,
        })
      } catch (error) {
        // todo set error
        // cannot login
        return error
      }
    },
    async fetchLectureContent({ commit, state }, { courseId, lectureId }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const { data } = await axios.get(
          `courses/${courseId}/lectures/${lectureId}`,
          {
            params: { studentId: state.user.userId },
          },
        )
        commit('setLectureContent', { data })
        return undefined
      } catch (error) {
        // todo set error
        // cannot login
        // console.log(error)
        return error
      }
    },
    async fetchThread({ commit, state }, { courseId, threadId }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const { data } = await axios.get(
          `courses/${courseId}/qna/${threadId}`,
          {
            params: { studentId: state.user.userId },
          },
        )
        return data
      } catch (error) {
        // todo set error
        // cannot login
        // console.log(error)
        return error
      }
    },
    async fetchQuiz({ commit, state }, { courseId, assignmentId }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const { data } = await axios.get(
          `courses/${courseId}/assignments/${assignmentId}`,
          {
            params: { studentId: state.user.userId },
          },
        )
        return data
      } catch (error) {
        // todo set error
        // cannot login
        // console.log(error)
        return error
      }
    },
    async completeLecture({ commit, state }, { courseId, lectureId }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const data = await axios.post(
          `courses/${courseId}/lectures/completed-lectures`,
          {
            studentId: state.user.userId,
            lectureId: lectureId,
          },
        )
        return undefined
      } catch (error) {
        // todo set error
        // cannot login
        // console.log(error)
        return error
      }
    },
    async createNote({ commit, state }, { courseId, lectureId, noteText }) {
      commit(mutations.SET_USER_DETAILS, { data: { userId: 1 } })
      try {
        const data = await axios.post(
          `courses/${courseId}/lectures/${lectureId}/notes`,
          {
            studentId: state.user.userId,
            noteText,
          },
        )
        return data
      } catch (error) {
        // todo set error
        // cannot login
        // console.log(error)
        return error
      }
    },
  },
  modules: {},
})
