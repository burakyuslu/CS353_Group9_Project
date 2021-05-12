<template>
  <v-form>
    <v-container >
      <v-card outlined tile>
              <v-card-title>
                Add Your Lecture Material Here
              </v-card-title>
      </v-card>
    </v-container>

    <v-container>
      <v-text-field v-model="lectureName" label="Add the name of your lecture">
      </v-text-field>
    </v-container>
    
    <v-container>
      <v-text-field v-model="url" label="Add the URL of your lecture video here">
      </v-text-field>
    </v-container>

    <v-container>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small>
            Add Lecture
        </v-btn>
      </router-link>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small>
            Cancel
        </v-btn>
      </router-link>
    </v-container>

  </v-form>
</template>

<script>
import axios from '../../utils/config.js'
export default {
  methods: {
    submit() {
      axios.post('', {data:lectureName, data:url}) // fill the link
      this.$router.go(-1)
    }
  },
  data() {
    return {
      lectureName: '',
      url: '',
    }
  }

}
</script>

<style></style>
