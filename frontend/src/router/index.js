import Vue from 'vue'
import VueRouter from 'vue-router'
import Lecture from '../views/student/Lecture.vue'
import CourseDetails from '../views/student/Course.vue'
import StudentDiscover from '../views/student/Discover.vue'
import StudentProfile from '../views/student/Profile.vue'
import InstructorHome from '../views/instructor/Home.vue'
import Instructor from '../views/instructor/Instructor.vue'
import CreateCourse from '../views/instructor/CreateCourse.vue'
import EditCertificate from '../views/instructor/EditCertificate.vue'
import AddLecture from '../views/instructor/AddLecture.vue'
import GoToCourseForum from '../views/instructor/Forum.vue'
import AddAssignment from '../views/instructor/AddAssignment.vue'
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
    path: '/instructor/home/editcertificate',
    name: 'instructor.home.editCertificate',
    component: EditCertificate,
  },
  {
    path: '/instructor/home/addlecture',
    name: 'instructor.home.addLecture',
    component: AddLecture,
  },
  {
    path: '/instructor/home/addassignment',
    name: 'instructor.home.addAssignment',
    component: AddAssignment,
  },
  {
    path: '/instructor/home/gotocourseforum',
    name: 'instructor.home.goToCourseForum',
    component: GoToCourseForum,
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
