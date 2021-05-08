import Vue from 'vue';
import VueRouter from 'vue-router';
import Lecture from '../views/student/Lecture.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'course.lecture',
    component: Lecture,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
