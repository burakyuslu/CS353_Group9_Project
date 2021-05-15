import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3003/api',
  timeout: 4000,
})

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
// axiosInstance.defaults.headers.post['Accepts'] = 'application/json'
export const URL = {
  LOGIN: 'users/login',
  SIGNUP: 'users/signup',
  COURSE_LIST: 'courses',
  USER_COURSES: 'users/courses',
  USER_WISHLIST: 'users/wishes',
  USER_CERTIFICATES: 'users/certificates',
  USER_STUDENT_PROFILE_DATA: 'users/students/profile',
  USER_STUDENT_WISH_COURSE: 'users/students/wishes',
  COURSE_COMMENTS: 'courses/',
}
axiosInstance.defaults.headers.common['Authorization'] = `Bearer 1`
export default axiosInstance
