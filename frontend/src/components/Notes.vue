<template>
  <v-app>
    <v-card>
      <v-card-title>Add Note: </v-card-title>
    </v-card>
    <v-card>
        <v-textarea v-model="enteredNote"></v-textarea>
        <v-btn class="addButton" v-on:click="addNote()">Add</v-btn>
    </v-card>
    <v-card>
      <v-list>
        <v-list-item class="listItem" v-for="note in notes" :key="note.id">- {{ note }}</v-list-item>
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
      notes: ['note1', 'note2']
    }
  },
  methods: {
    addNote(){
      if(this.enteredNote == '')
      {
        alert("You cannot add an empty note.");
        return;
      }
      this.notes.push(this.enteredNote)
    }
  }
};
</script>

<style scoped>


</style>
