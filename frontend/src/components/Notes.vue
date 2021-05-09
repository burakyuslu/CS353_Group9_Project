<template>
  <v-app>
    <div class="enter_text">
      <v-textarea v-model="enteredNote"></v-textarea>
      <v-btn class="addButton" v-on:click="addNote()">Add Note</v-btn>
    </div>
    <div class="notes">
      <v-list>
        <v-list-item class="listItem" v-for="note in notes" :key="note.id">{{ note }}</v-list-item>
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

.addButton{
  width: 15%;
  margin-right: auto;
  margin-left: auto;
  margin: 15 px;
}

.notes{
  margin: 15 px;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  border: 3px solid black;
}

.listItem{
  border: 3px solid black;
  margin: 5px;
}

.enter_text{
  width: 60%;
  margin-right: 20%;
  margin-left: 20%;
}
</style>
