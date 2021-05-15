<template>
  <v-container>
    <v-card>
      <v-card-title>Announcements </v-card-title>
      <v-list>
        <v-list-item
            class="listItem"
            v-for="announcement in announcements"
            :key="announcement.ann_date"
        >- {{ announcement.ann_text }}</v-list-item
        >
      </v-list>
    </v-card>
    <v-card>
      <v-card-title>
        Post an Announcement
      </v-card-title>
      <v-text-field v-model="announcementText">
        Write your announcement here
      </v-text-field>
      <v-btn @click="submit">
        Post
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
//import axios from '../../utils/config.js'
export default {
  name: 'App',

  methods: {
    addAnnouncement() {
      //axios.post('courses/2/announcements', {announcementText: this.announcementText})
      this.$router.go(-1)
    },
    getAnnouncements(){
      //axios.get('courses/2/announcements')
    }
  },
  data(){
    return{
      announcementText: '',
      announcements: axios.get('courses/2/announcements')
    }
  }
}
</script>

<style scoped></style>
