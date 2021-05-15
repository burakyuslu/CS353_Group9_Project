<template>
  <div>
    <v-container class="grey lighten-5">
      <v-card></v-card>
    </v-container>
    <pre>
      <v-row justify="center">
        <v-card
            max-width="1024"
            max-height="768"
        >
          <v-card-title class="deep-purple">
            <span class="headline white--text">Certificate of Completion</span>
          </v-card-title>
          <v-card-text
              class="font-weight-medium"
          >
            ID Of This Certificate Of Completion: {{ certificate.certificateId }}
          <v-divider></v-divider>
            Holder Of This Certificate: {{ certificate.name }} {{ certificate.surname }}
          <v-divider></v-divider>
            Completed Course: {{ certificate.courseName }}
          <v-divider></v-divider>
            Data Awarded: {{ certificate.date }}
          <v-divider></v-divider>
            Final Grade: final grade for certificates are held at Earns, which cannot be accessed here.
            Either remove this line or add the grade to certificate.
          <v-divider></v-divider>
            Instructor's Note: {{ certificate.certificationText }}
          </v-card-text>

        </v-card>
      </v-row>
    </pre>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  // TODO FINAL GRADE
  async mounted() {
    const certificateId = this.$route.params.certificateId

    this.certificate = await this.fetchCertificate({certificateId})
  },
  methods: {
    ...mapActions(['fetchCertificate']),
  },
  data() {
    return {
      certificate: {},
    }
  },
}
</script>

<style></style>
