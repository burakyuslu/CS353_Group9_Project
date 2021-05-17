import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import AdminHome from '../views/admin/Home.vue'
import Admin from '../views/auth/Admin.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
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
  { path: '/auth/signup', name: 'auth.signup', component: Signup },
  { path: '/auth/admin', name: 'auth.admin', component: Admin },
  {
    path: '/student',
    name: 'student',
    component: Student,
    children: [
      {
        path: 'home',
        name: 'student.home',
        component: StudentDiscover,
        meta: {
          requiresAuth: true,
        },
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
    meta: {
      requiresAuth: true,
      requiresStudent: true,
    },
  },
  {
    path: '/instructor/home',
    name: 'instructor.home',
    component: InstructorHome,
    meta: {
      requiresInstructor: true,
      requiresAuth: true,
    },
  },
  {
    path: '/instructor/home/create',
    name: 'instructor.home.createCourse',
    component: CreateCourse,
    meta: {
      requiresInstructor: true,
      requiresAuth: true,
    },
  },
  {
    path: '/instructor/home/editcertificate',
    name: 'instructor.home.editCertificate',
    component: EditCertificate,
    meta: {
      requiresAuth: true,
      requiresInstructor: true,
    },
  },
  {
    path: '/instructor/home/addlecture',
    name: 'instructor.home.addLecture',
    component: AddLecture,
    meta: {
      requiresAuth: true,
      requiresInstructor: true,
    },
  },
  {
    path: '/instructor/home/addassignment/:courseId',
    name: 'instructor.home.addAssignment',
    component: AddAssignment,
    props: true,
    meta: {
      requiresAuth: true,
      requiresInstructor: true,
    },
  },
  {
    path: '/instructor/home/:courseId',
    name: 'instructor.home.goToCourseForum',
    component: GoToCourseForum,
    props: true,
    meta: {
      requiresAuth: true,
      requiresInstructor: true,
    },
  },
  {
    path: '/certificate/:certificateId',
    name: 'student.certificate',
    component: Certificate,
    props: true,
  },
  {
    path: '/admin/home',
    name: 'admin.home',
    component: AdminHome,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '*',
    redirect: { name: 'student.home' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresVisitor = to.matched.some(record => record.meta.requiresVisitor)
  const requiresStudent = to.matched.some(record => record.meta.requiresStudent)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const requiresInstructor = to.matched.some(
    record => record.meta.requiresInstructor,
  )
  if (requiresAuth && !store.getters.getSignedIn) {
    next({ name: 'auth.login' })
  } else if (requiresVisitor && store.getters.getSignedIn) {
    if (store.getters.userType) {
      next({ name: `${store.getters.userType}.home` })
    } else {
      next({ name: 'auth.login' })
    }
  } else {
    if (
      (requiresAdmin || requiresInstructor) &&
      store.getters.userType === 'student'
    ) {
      next({ name: `${store.getters.userType}.home` })
    } else if (
      (requiresStudent || requiresInstructor) &&
      store.getters.userType === 'admin'
    ) {
      next({ name: `${store.getters.userType}.home` })
    } else if (
      (requiresStudent || requiresAdmin) &&
      store.getters.userType === 'instructor'
    ) {
      next({ name: `${store.getters.userType}.home` })
    }

    next()
  }
})

export default router
