<template>
  <v-container class="grey lighten-5">
    <v-card>
      <v-container>
        <v-switch :label="text" v-model="value"></v-switch>
        <v-text-field label="Name" v-model="name"></v-text-field>
        <v-text-field label="Surname" v-model="surname"> </v-text-field>
        <v-text-field label="E-mail" v-model="email"></v-text-field>
        <v-text-field label="Password" v-model="password"> </v-text-field>
      </v-container>
      <v-alert v-model="messageModel" type="error" dismissible>
        {{ errorMessage }}
      </v-alert>
      <v-card-actions>
        <v-btn @click="signup"> Sign Up </v-btn>
        <v-btn :to="{name: 'auth.login'}" >Go to Sign In</v-btn>
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
      errorMessage: '',
    }
  },
  methods: {
    ...mapActions({ signIn: actions.SIGN_IN }),
    ...mapMutations({ setUserType: mutations.SET_USER_TYPE }),
    async login() {
      // console.log('this.userTpye')
      // this.setUserType({ type: this.userType })

      try {
        await this.signIn({
          userType: this.userType,
          email: this.email,
          password: this.password,
        })
      } catch (error) {
        this.messageModel = true
        this.errorMessage = error.message
      }

      this.$router.push({ name: `${this.userType}.home` })
    },
    signup(){
      axios.post(`auth/signup`, {isInstructor: this.value, name: this.name, surname: this.surname, password: this.password, email: this.email})
    }
  },
  computed: {
    userType() {
      return this.value ? 'instructor' : 'student'
    },
  },
}
</script>