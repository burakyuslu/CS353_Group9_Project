<template>
  <div>
    <section>
      <v-card>
        <v-card-title class="headline mb-1">
          {{ quizName }}
        </v-card-title>
        <v-card-text>
          Solve the quiz. Then submit it. Once you submit, your grade will be automatically calculated for you.
        </v-card-text>
        <v-card-actions>
          <v-btn
              outlined
              text
              v-on:click="submitQuiz"
          >
            Submit Quiz
          </v-btn>
          <v-btn
              outlined
              text
              v-on:click="leaveQuiz"
          >
            Go Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>

    <section v-if="quizSubmitted === 1">
      <h2>
        Quiz Submitted, Score: {{ quizScore }}

      </h2>
    </section>

    <section v-if="quizSubmitted === 0 || quizSubmitted === 1">
      <h2>
        Quiz Questions:
      </h2>

    </section>
    <v-card v-for="qQuestion in questions" :key="qQuestion.questionId" outlined @click="updateStudentAnswer(qQuestion.questionId, $event)">
      <v-card-title>
        {{ qQuestion.questionText }}
      </v-card-title>

      <v-col>
        <v-radio-group
            column
            v-model="qQuestion.answer"
        >
          <v-radio
              v-for="option in qQuestion.options"
              :label="option"
              :value="option"
              :key="qQuestion.questionId+option"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-card>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // shownPart=1 -> show refund requests, shownPart=2 -> show complaints, shownPart=3-> show discount requests
      course: "Programming",
      quizName: "Example Quiz",
      quizSubmitted: 0,
      quizScore: 0,
      selectedOption:"",
      questions: [
        {
          questionId: 1,
          questionText: "Bla bla bla?",
          options: {
            option1: "A",
            option2: "B",
            option3: "C",
            option4: "D",
          },
          answer: ""
        },
        {
          questionId: 2,
          questionText: "Bla bla bla?",
          options: {
            option1: "X",
            option2: "Y",
            option3: "Z",
            option4: "W",
          },
          answer: ""
        },
        {
          questionId: 3,
          questionText: "Bla bla bla?",
          options: {
            option1: "K",
            option2: "L",
            option3: "M",
            option4: "N",
          },
          answer: ""
        }
      ],
    }
  },
  computed: {},
  methods: {
    submitQuiz: function () {
      // compare with actual answers to calculate the result & set score
      // grade
      this.quizScore = 69.69;

      // print the result
      this.quizSubmitted = 1;

      // debug
      console.log(this.questions);
    },
    leaveQuiz: function () {
      this.quizSubmitted = 0;
    },
    updateStudentAnswer(questId){
      //let i;
      //// if an answer already exists for that question, delete it from the student answers
      //for( i = 0; i < this.studentAnswers.length; i++){
      //  if( this.studentAnswers[i].solvedQuestionId === questId){
      //    this.studentAnswers.splice(i, 1);
      //  }
      //}
//
      //// add the student's answer to the student answers array
      //this.studentAnswers.push( {
      //  solvedQuestionId: questId,
      //  studentAnswer: this.selectedOption
      //})
    }

  }
}
</script>

<style>

</style>