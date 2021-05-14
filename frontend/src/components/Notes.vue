<template>
  <v-container>
    <v-card class="ma-2">
      <v-card-title>Add Note </v-card-title>
    </v-card>
    <v-card class="ma-2">
      <v-textarea v-model="enteredNote"></v-textarea>
      <v-btn class="ma-2 addButton" v-on:click="addNote()">Add</v-btn>
    </v-card>
    <v-card v-if="notes.length > 0">
      <v-list>
        <v-list-item class="listItem" v-for="note in notes" :key="note.note_id"
          >- {{ note.note_text }}</v-list-item
        >
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  props: ['notes', 'courseId', 'lectureId'],

  data() {
    return {
      enteredNote: '',
      creating: false,
    }
  },
  methods: {
    ...mapActions(['createNote', 'fetchLectureContent']),
    async addNote() {
      if (this.enteredNote == '') {
        alert('You cannot add an empty note.')
        return
      }
      const error = await this.createNote({
        courseId: this.courseId,
        lectureId: this.lectureId,
        noteText: this.enteredNote,
      })
      await this.fetchLectureContent({
        courseId: this.courseId,
        lectureId: this.lectureId,
      })
    },
  },
}
</script>

<style scoped></style>
