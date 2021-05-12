<template>
  <v-app>
    <v-app-bar app>
      <nav>
        <router-link to="/admin/home">Admin</router-link> |
        <router-link to="/student/discover">Student Discover</router-link> |
        <router-link to="/student/profile">Student Profile</router-link> |
        <router-link to="/instructor/home">Instructor</router-link> |
        <router-link to="/lecture">Lecture</router-link> |
        <router-link to="/course">Course Details</router-link> |
        <router-link to="/student/quiz">Student Quiz</router-link>
        <!-- -->
      </nav>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>
<script>
export default { name: 'App', data: () => ({}) }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
