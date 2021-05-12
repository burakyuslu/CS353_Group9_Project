<template>
  <v-app>
    <v-container >
      <v-card outlined tile>
        <v-card-title class="header">
          Create Quiz for Course: {{courseName}}
        </v-card-title>
      </v-card>
      <v-card outlined tile>
        <v-card-title>
          Quiz Name:
        </v-card-title>
        <v-text-field label="Enter name here">
        </v-text-field>
      </v-card>
      <v-card outlined tile>
        <v-card-title>
          Weight (%):
        </v-card-title>
        <v-text-field label="Enter weight here">
        </v-text-field>
      </v-card>
      <v-card outlined tile>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ml-2 mt-5" outline rounded small
                   v-bind="attrs"
                   v-on="on">
              Add Questions
            </v-btn>

          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add Question</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-radio-group v-model="radioGroup">
                  <v-row>
                    <v-col>
                      <v-card>
                        <v-text-field
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
                            value="Correct1"
                            color="green">

                        </v-radio>
                        <v-text-field
                            label="Choice 1">
                        </v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card>
                        <v-radio
                            label="Correct Choice"
                            value="Correct2"
                            color="green">

                        </v-radio>
                        <v-text-field
                            label="Choice 2">
                        </v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card>
                        <v-radio
                            label="Correct Choice"
                            value="Correct3"
                            color="green">

                        </v-radio>
                        <v-text-field
                            label="Choice 3">
                        </v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card>
                        <v-radio
                            label="Correct Choice"
                            value="Correct4"
                            color="green">

                        </v-radio>
                        <v-text-field
                            label="Choice 4">
                        </v-text-field>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="green"
                  text
                  @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="green"
                  text
                  @click="dialog = false"
              >
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-container>

    <v-container>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small>
          Save Assingment
        </v-btn>
      </router-link>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small>
          Cancel
        </v-btn>
      </router-link>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  // question: [],
  // answers: [],

  // computed: {
  //       items () {
  //         const questionLength = this.question.length
  //         const answersLength = this.answers.length

  //         return Array.from({ length: 10 }, (k, v) => {
  //           const question = this.question[]
  //           const asnwer = this.answer[]

  //           return {
  //             color: this.colors[this.genRandomIndex(colorsLength)],
  //             fullName: `${name} ${surname}`,
  //             initials: `${name[0]} ${surname[0]}`,
  //           }
  //         })
  //       },
  //     },

// for testing add v-bind:key="question.text" to the question text

//add Answers and correct answer?
  // methods: {
  //   addAssignmentQuestion: function() {
  //     this.assignment.push({
  //       text: this.question.text
  //     })
  //   }
  // },

  data(){
    return{
      radioGroup: 1,
      enteredNote: '',
      courseName: 'Learn Programming with Python',
      dialog: false,
      questions: ['Question 1', 'Question 2', 'Question 3' ,"Question 4"]
    }
    assignment : [
      
    ]
  },
};
</script>


<style scoped>
.header{
  text-align: center;
}



</style>
