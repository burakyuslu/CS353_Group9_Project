<template>
  <v-container class="grey lighten-5">
    <v-card>
      <v-alert v-model="errorOccured" type="error" dismissible>
        Sign up failed
      </v-alert>
      <v-container>
        <v-switch :label="text" v-model="value"></v-switch>
        <v-text-field label="Name" v-model="name"></v-text-field>
        <v-text-field label="Surname" v-model="surname"> </v-text-field>
        <v-text-field label="E-mail" v-model="email"></v-text-field>
        <v-text-field type="password" label="Password" v-model="password">
        </v-text-field>
      </v-container>
      <v-card-actions>
        <v-btn @click="signup"> Sign Up </v-btn>
        <v-btn :to="{ name: 'auth.login' }">Go to Sign In</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { actions, mutations } from '../../store/types.js'
import { mapActions, mapMutations } from 'vuex'
import axios from '../../utils/config.js'
export default {
  data() {
    return {
      value: false,
      text: 'Are you an instructor?',
      email: '',
      password: '',
      name: '',
      surname: '',
      messageModel: false,
      errorOccured: false,
    }
  },
  methods: {
    ...mapActions({ signIn: actions.SIGN_IN }),
    ...mapMutations({ setUserType: mutations.SET_USER_TYPE }),

    async signup() {
      try {
        await axios.post(`auth/signup`, {
          isInstructor: this.value,
          name: this.name,
          surname: this.surname,
          password: this.password,
          email: this.email,
        })
        this.errorOccured = false
        await this.$router.push({ name: 'auth.login' })
      } catch (exception) {
        console.log(exception)
        this.errorOccured = true
      }
    },
  },
  computed: {
    userType() {
      return this.value ? 'instructor' : 'student'
    },
  },
}
</script>
