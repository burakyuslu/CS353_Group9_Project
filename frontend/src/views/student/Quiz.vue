<template>
  <v-container class="grey lighten-5">
    <section>
      <v-card>
        <v-card-title class="headline mb-1">
          <router-link
            :to="{
              name: 'student.lecture',
            }"
          >
            <v-btn class="mr-3">
              Go back
            </v-btn>
          </router-link>
          {{ quizName }}
        </v-card-title>
        <v-card-text>
          Solve the quiz. Then submit it. Once you submit, your grade will be
          automatically calculated for you.
        </v-card-text>
        <v-card-actions>
          <v-btn outlined text v-on:click="submitQuiz">
            Submit Quiz
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>

    <section v-if="quizSubmitted === 1">
      <h2>Quiz Submitted, Score: {{ quizScore }}</h2>
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
        <v-radio-group column v-model="qQuestion.answer">
          <v-radio
            v-for="option in qQuestion.options"
            :label="option"
            :value="option"
            :key="qQuestion.questionId + option"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  components: {},
  params: ['courseId', 'lectureId', 'quizId'],
  data() {
    return {
      // shownPart=1 -> show refund requests, shownPart=2 -> show complaints, shownPart=3-> show discount requests
      course: 'Programming',
      quizName: 'Example Quiz',
      quizSubmitted: 0,
      quizScore: 0,
      selectedOption: '',
      questions: [],
    }
  },
  computed: {},
  methods: {
    submitQuiz: function() {
      // compare with actual answers to calculate the result & set score
      // grade
      this.quizScore = 69.69

      // print the result
      this.quizSubmitted = 1

      // debug
      console.log(this.questions)
    },

    ...mapActions(['fetchQuiz']),
  },
  async mounted() {
    this.questions = await this.fetchQuiz({
      courseId: this.$route.params.courseId,
      assignmentId: this.$route.params.quizId,
    })
  },
}
</script>

<style></style>
