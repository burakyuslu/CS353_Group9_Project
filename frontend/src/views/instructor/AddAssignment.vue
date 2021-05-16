<template>
  <div>
    <v-container>
      <v-card outlined tile>
        <v-card-title class="header">
          Create Quiz for Course: {{ courseName }}
        </v-card-title>
      </v-card>
      <v-card outlined tile>
        <v-card-title>
          Quiz Name:
        </v-card-title>
        <v-text-field label="Enter name here" v-model="quizName">
        </v-text-field>
      </v-card>
      <v-card outlined tile>
        <v-card-title>
          Weight (%):
        </v-card-title>
        <v-text-field label="Enter weight here" v-model="weight">
        </v-text-field>
      </v-card>
      <v-card outlined tile>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-2 mt-5"
              outlined
              rounded
              small
              v-bind="attrs"
              v-on="on"
            >
              Add Questions
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add Question</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-radio-group v-model="answer">
                  <v-row>
                    <v-col>
                      <v-card>
                        <v-text-field
                          v-model="question"
                          label="Question"
                          required
                        >
                        </v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card>
                        <v-radio
                          label="Correct Choice"
                          :value="answer1"
                          color="green"
                        >
                        </v-radio>
                        <v-text-field v-model="answer1" label="Choice 1">
                        </v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card>
                        <v-radio
                          label="Correct Choice"
                          :value="answer2"
                          color="green"
                        >
                        </v-radio>
                        <v-text-field v-model="answer2" label="Choice 2">
                        </v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card>
                        <v-radio
                          label="Correct Choice"
                          :value="answer3"
                          color="green"
                        >
                        </v-radio>
                        <v-text-field v-model="answer3" label="Choice 3">
                        </v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card>
                        <v-radio
                          label="Correct Choice"
                          :value="answer4"
                          color="green"
                        >
                        </v-radio>
                        <v-text-field v-model="answer4" label="Choice 4">
                        </v-text-field>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false">
                Cancel
              </v-btn>
              <v-btn color="green" text @click="addAssignmentQuestion">
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-container>

    <v-container>
      <li v-for="item in assignment" :key="item.question">
        {{ item }}
      </li>
    </v-container>

    <v-container>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small @click="submit">
          Save Assignment
        </v-btn>
      </router-link>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small>
          Cancel
        </v-btn>
      </router-link>
    </v-container>
  </div>
</template>

<script>
import axios from '../../utils/config.js'
export default {
  name: 'App',

  methods: {
    addAssignmentQuestion() {
      this.assignment.push({
        questionText: this.question,
        answer: this.answer,
        answer1: this.answer1,
        answer2: this.answer2,
        answer3: this.answer3,
        answer4: this.answer4,
      })
      console.log(this.assignment)
      this.questionText = ''
      this.answer = ''
      this.answer1 = ''
      this.answer2 = ''
      this.answer3 = ''
      this.answer4 = ''

      this.dialog = false
    },

    submit() {
      axios.post(`courses/${this.$route.params.courseId}/assignments/quizzes`, {
        quizName: this.quizName,
        weight: this.weight,
        assignment: this.assignment,
      })
      this.$router.push({ name: 'instructor.home' })
    },
  },

  data() {
    return {
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answers: [],
      assignment: [],
      radioGroup: 1,
      answer: '',
      enteredNote: '',
      courseName: 'Learn Programming with Python',
      dialog: false,
      questions: ['Question 1', 'Question 2', 'Question 3', 'Question 4'],
      quizName: '',
      weight: '',
    }
  },
}
</script>

<style scoped>
.header {
  text-align: center;
}
</style>
