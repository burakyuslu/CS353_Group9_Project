<template>
  <v-form>
    <v-container >
      <v-card outlined tile>
              <v-card-title>
                Create Your Course (You will have the chance to add lectures and assignments in the main)
              </v-card-title>
      </v-card>
    </v-container>

    <v-container>
      <v-text-field v-model="courseName" label="Enter The Name Of Your Course">
      </v-text-field>
    </v-container>

    <v-container>
      <v-text-field v-model="category" label="Enter Course Category">
      </v-text-field>
    </v-container>



    <v-container>
      <v-text-field  v-model="price">
        <template v-slot:label>
          Enter The Initial Price For The Course
        </template>
      </v-text-field>
    </v-container>

    <v-container>
      <v-textarea v-model="courseSummary" label="Enter Course Summary">
      </v-textarea>
    </v-container>

    <v-container>
      <v-textarea v-model="certificationText" label="Enter Course Certification Text">
      </v-textarea>
    </v-container>


    <v-container>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small @click="submit">
            Save Your Course
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
      axios.post('courses', {courseName:this.courseName, courseSummary: this.courseSummary, price: this.price, category:this.category,
        instructorId: 4, certificationText: this.certificationText}) // fill the link
      this.$router.go(-1)
    }
  },
  data() {
    return {
      courseName: '',
      category: '',
      courseSummary: '',
      price: '',
      certificationText: ''
    }
  }
}
</script>

<style></style>
