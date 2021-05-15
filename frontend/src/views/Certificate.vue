<template>
  <div>
    <v-container class="grey lighten-5"> <v-card> </v-card> </v-container>
    <pre>
        {{ certificate }}
    </pre>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  async mounted() {
    const certificateId = this.$route.params.certificateId

    this.certificate = await this.fetchCertificate({ certificateId })
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
