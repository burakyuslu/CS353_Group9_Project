<template>
  <v-container>
    <v-card>
      <v-card-title>Announcements </v-card-title>
      <v-list>
        <v-list-item
          class="listItem"
          v-for="announcement in announcements"
          :key="announcement.ann_date"
          >{{ announcement.ann_text }} ({{
            announcement.ann_date
          }})</v-list-item
        >
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
//import axios from '../../utils/config.js'
import axios from '../utils/config'

export default {
  name: 'App',
  props: ['announcements'],
  methods: {
    // addAnnouncement(){
    //   this.announcements.push({
    //     announcementText: this.announcementText
    //   })
    //   this.announcementText = ''
    // },
    // submit() {
    //   this.addAnnouncement()
    //   //axios.post('courses/2/announcements', {announcementText: this.announcementText})
    //   this.$router.go(-1)
    // },
  },
  async mounted() {
    // const response = await axios.get('courses/1/announcements')
    // this.announcements = response.data
  },
  data() {
    return {
      announcementText: '',
      // announcements: [],
    }
  },
}
</script>

<style scoped></style>
