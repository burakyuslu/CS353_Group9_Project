import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from '../views/admin/Home.vue'
//v2
import Login from '../views/auth/Login.vue'
import Certificate from '../views/Certificate.vue'
import AddAssignment from '../views/instructor/AddAssignment.vue'
import AddLecture from '../views/instructor/AddLecture.vue'
import CreateCourse from '../views/instructor/CreateCourse.vue'
import EditCertificate from '../views/instructor/EditCertificate.vue'
import GoToCourseForum from '../views/instructor/Forum.vue'
import InstructorHome from '../views/instructor/Home.vue'
import Student from '../views/Student.vue'
import CourseDetails from '../views/student/Course.vue'
import StudentDiscover from '../views/student/Discover.vue'
import Lecture from '../views/student/Lecture.vue'
import StudentProfile from '../views/student/Profile.vue'
import Quiz from '../views/student/Quiz.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { name: 'auth.login' } },
  { path: '/auth', redirect: { name: 'auth.login' } },
  { path: '/auth/login', name: 'auth.login', component: Login },
  {
    path: '/student',
    name: 'student',
    component: Student,
    redirect: { name: 'student.home' },
    children: [
      {
        path: 'home',
        name: 'student.home',
        component: StudentDiscover,
      },
      {
        path: 'profile',
        name: 'student.profile',
        component: StudentProfile,
      },
      {
        path: 'courses',
        redirect: { name: 'student.home' },
      },
      {
        path: 'courses/:courseId',
        name: 'student.course',
        component: CourseDetails,
        props: true,
      },
      {
        path: 'courses/:courseId/:lectureId/quiz/:quizId',
        name: 'student.quiz',
        component: Quiz,
        props: true,
      },
      {
        path: 'courses/:courseId/:lectureId',
        name: 'student.lecture',
        component: Lecture,
        props: true,
      },
    ],
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
  {
    path: '/student/quiz',
    name: 'student.quiz',
    component: Quiz,
  },
  {
    path: '/certificate/:certificateId',
    name: 'student.certificate',
    component: Certificate,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
