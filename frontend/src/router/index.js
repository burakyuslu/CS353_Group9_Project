import Vue from 'vue'
import VueRouter from 'vue-router'
import Lecture from '../views/student/Lecture.vue'
import CourseDetails from '../views/student/Course.vue'
import StudentDiscover from '../views/student/Discover.vue'
import StudentProfile from '../views/student/Profile.vue'
import InstructorHome from '../views/instructor/Home.vue'
import Instructor from '../views/instructor/Instructor.vue'
import CreateCourse from '../views/instructor/CreateCourse.vue'
// import InstructorHome from '../views/instructor/Home.vue'
// import InstructorHome from '../views/instructor/Home.vue'
// import InstructorHome from '../views/instructor/Home.vue'
import AdminHome from '../views/admin/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'student.discover' },
  },
  {
    path: '/student/discover',
    name: 'student.discover',
    component: StudentDiscover,
  },
  {
    path: '/student/profile',
    name: 'student.profile',
    component: StudentProfile,
  },
  {
    path: '/instructor/home',
    name: 'instructor.home',
    component: InstructorHome,
  },
  {
    path: '/instructor/home/create',
    name: 'instructor.home.createCourse',
    component: CreateCourse,
  },
  {
    path: '/admin/home',
    name: 'admin.home',
    component: AdminHome,
  },
  {
    path: '/lecture',
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
