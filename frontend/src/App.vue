<template>
  <v-app>
    <nav>
      <v-app-bar app>
        <v-toolbar-title class="mx-2 font-weight-bold">
          YouCourse
        </v-toolbar-title>
        <!-- <router-link v-if="isAdmin" to="/admin/home">Admin</router-link> | -->

        <router-link
          v-if="getSignedIn && isStudent"
          exact
          :to="{ name: 'student.home' }"
        >
          <v-btn class="elevation-0 primary mx-3">
            Discover
          </v-btn>
        </router-link>

        <router-link
          v-if="getSignedIn && isStudent"
          exact
          :to="{ name: 'student.profile' }"
        >
          <v-btn class="elevation-0 primary mx-3">
            Profile
          </v-btn>
        </router-link>

        <router-link
          v-if="getSignedIn && isInstructor"
          exact
          :to="{ name: 'instructor.home' }"
        >
          <v-btn class="elevation-0 primary mx-3">
            Home
          </v-btn>
        </router-link>

        <v-spacer></v-spacer>
        <v-btn
          v-if="getSignedIn"
          exact
          @click="logout"
          class="elevation-0 primary mx-3"
        >
          Logout
        </v-btn>
      </v-app-bar>
    </nav>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'App',
  data: () => ({}),
  computed: {
    ...mapGetters(['userType', 'getSignedIn']),
    isAdmin() {
      return this.userType === 'admin'
    },
    isStudent() {
      return this.userType === 'student'
    },
    isInstructor() {
      return this.userType === 'instructor'
    },
  },
  methods: {
    logout() {
      this.$router.push({ name: 'auth.login' })
      this.logoutMutation()
    },
    ...mapMutations(['updateToken', 'logoutMutation']),
  },

  created() {
    this.updateToken()
  },
}
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
