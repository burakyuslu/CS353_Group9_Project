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
            ID Of This Certificate Of Completion: {{ certificate.certificate_id }}
          <v-divider></v-divider>
            Holder Of This Certificate: {{ certificate.name }} {{ certificate.surname }}
          <v-divider></v-divider>
            Completed Course: {{ certificate.course_name }}
          <v-divider></v-divider>
            Date Awarded: {{ certificate.cdate }}
          <v-divider></v-divider>
            Final Grade: {{ certificate.final_grade}}
          <v-divider></v-divider>
            Instructor's Note: {{ certificate.certification_text }}
          </v-card-text>

        </v-card>
      </v-row>
    </pre>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async mounted() {
    const certificateId = this.$route.params.certificateId
    const res = await this.fetchCertificate({ certificateId })
    this.certificate = res[0]
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
