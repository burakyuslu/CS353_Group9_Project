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
  COURSE_LIST: 'courses'
  
}
export default axiosInstance
