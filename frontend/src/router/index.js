import Vue from 'vue'
import VueRouter from 'vue-router'
import Lecture from '../views/student/Lecture.vue'
import CourseDetails from '../views/student/Course.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'course.lecture',
    component: Lecture,
  },
  {
    path: '/course',
    name: 'course.details',
    component: CourseDetails,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
