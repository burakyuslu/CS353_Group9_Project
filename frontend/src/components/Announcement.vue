<template>
  <v-app>
      <v-card>
        <v-card-title>Announcements: {{courseName}}</v-card-title>
          <v-list shaped>
            <v-list-item class="listItem" v-for="announcement in announcements" :key="announcement.id">- {{ announcement }}</v-list-item>
          </v-list>
      </v-card>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data(){
    return{
      enteredNote: '',
      courseName: 'Learn Programming with Python',
      announcements: ['A typo in lecture 23 is corrected', 'Lecture 67 is now available']
    }
  },
};
</script>

<style scoped>

</style>