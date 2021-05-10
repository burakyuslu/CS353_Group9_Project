<template>
  <v-app>
    <h1>Announcements</h1>
    <h2>{{courseName}}</h2>
    <div class="announcements">
      <v-list shaped>
        <v-list-item class="listItem" v-for="announcement in announcements" :key="announcement.id">{{ announcement }}</v-list-item>
      </v-list>
    </div>
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

.addButton{
  width: 15%;
  margin-right: auto;
  margin-left: auto;
  margin: 15 px;
}

.announcements{
  margin: 15 px;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  border: 3px solid black;
}

.enter_text{
  width: 60%;
  margin-right: 20%;
  margin-left: 20%;
}

h1{
  margin-left: auto;
  margin-right: auto;
}
h2{
  margin-left: auto;
  margin-right: auto;
}
</style>