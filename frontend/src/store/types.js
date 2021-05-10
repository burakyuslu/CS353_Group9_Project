export const mutations = {
  SET_USER_DETAILS: 'SET_USER',
  SET_USER_TYPE: 'SET_USER_TYPE',
  SIGN_IN: 'SET_SIGN_IN',
  LOG_OUT: 'SET_LOG_OUT',
  SET_TOKEN: 'SET_SET_TOKEN',
  SET_COURSE_LIST: 'SET_COURSE_LIST',
}

export const getters = {
  GET_COURSES_STUDENT_HOME: 'GET_COURSES_STUDENT_HOME',
}

export const actions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  FETCH_COURSE_DETAILS: 'FETCH_COURSE_DETAILS',
  FETCH_COURSE_LIST: 'FETCH_COURSE_LIST',
}

export default {
  ...mutations,
  ...getters,
  ...actions,
}
