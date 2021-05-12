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
    <v-card v-for="qQuestion in questions" :key="qQuestion.questionId" outlined>
      <v-card-title>
        {{ qQuestion.questionText }}
      </v-card-title>

      <v-col>
        <v-radio-group
            column
        >
          <v-radio
              v-for="option in qQuestion.options"
              :label="`${option}`"
              :key="option"
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
      questions: [
        {
          questionId: 1,
          questionText: "Bla bla bla?",
          options: {
            option1: "A",
            option2: "B",
            option3: "C",
            option4: "D",
          }
        },
        {
          questionId: 2,
          questionText: "Bla bla bla?",
          options: {
            option1: "X",
            option2: "Y",
            option3: "Z",
            option4: "W",
          }
        },
        {
          questionId: 1,
          questionText: "Bla bla bla?",
          options: {
            option1: "K",
            option2: "L",
            option3: "M",
            option4: "N",
          }
        }
      ],
      studentAnswers: []
    }
  },
  computed: {},
  methods: {
    submitQuiz: function () {
      this.quizSubmitted = 1;
      this.quizScore = 69.69;

    },
    leaveQuiz: function () {
      this.quizSubmitted = 0;
    }

  }
}
</script>

<style>

</style>