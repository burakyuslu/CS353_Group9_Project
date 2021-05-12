export const mutations = {
  SET_USER_DETAILS: 'SET_USER',
  SET_USER_TYPE: 'SET_USER_TYPE',
  SIGN_IN: 'SET_SIGN_IN',
  LOG_OUT: 'SET_LOG_OUT',
  SET_TOKEN: 'SET_SET_TOKEN',
  SET_COURSE_LIST: 'SET_COURSE_LIST',
  SET_STUDENT_PROFILE_DATA: 'SET_STUDENT_PROFILE_DATA',
  SET_STUDENT_COURSE_DETAILS: 'SET_STUDENT_COURSE_DETAILS',
}

export const getters = {
  GET_COURSES_STUDENT_HOME: 'GET_COURSES_STUDENT_HOME',
  GET_STUDENT_PROFILE_DATA: 'GET_STUDENT_PROFILE_DATA',
  GET_STUDENT_NOTIFICATIONS: 'GET_STUDENT_NOTIFICATIONS',
  GET_STUDENT_COURSE_DETAILS: 'GET_STUDENT_COURSE_DETAILS',
}

export const actions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  FETCH_COURSE_DETAILS: 'FETCH_COURSE_DETAILS',
  FETCH_COURSE_LIST: 'FETCH_COURSE_LIST',
  FETCH_USER_PROFILE_DATA: 'FETCH_USER_PROFILE_DATA', // student
  BUY_COURSE: '',
  WISHLISH_COURSE: '',
  UNWISH_COURSE: 'UNWISH_COURSE',
  REQUEST_REFUND: 'REQUEST_REFUND',
  COURSE_COMMENTS: 'COURSE_COMMENTS',
}

export default {
  ...mutations,
  ...getters,
  ...actions,
}
