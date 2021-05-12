<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col>
        <v-card outlined tile>
          <pre>
            {{ courseDetails.course.course_name }}
          </pre>
        </v-card>
      </v-col>
      <v-col order="12">
        <v-card class="pa-5" outlined tile>
          4.7/5.0 <br />
          (46,766 ratings) <br />
          158,605 students
        </v-card>
      </v-col>
      <v-col order="1">
        <v-card class="pa-5">
          should Show buttons: {{ shouldShowButtons }} discounts should be shown
          according to user type The price of the course is $123
          <br />
          <v-btn>BUY NOW</v-btn>
          <br />
          <v-btn>ADD TO WISHLIST</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <v-card class="pa-5" outlined tile>
          Lectures -LIST- COMPONENT WILL COME
          <pre>
            lectures {{ courseDetails.lectures }}
          </pre>
          <pre>
            should Show buttons: {{ shouldShowButtons }}
            completeds: {{ courseDetails.completedLectures }}
          </pre>
        </v-card>
      </v-col>
      <v-col order="12">
        <v-card class="pa-5" outlined tile>
          <pre>
          {{ courseDetails.course.course_summary }}

          </pre>
        </v-card>
        <v-card outlined tile>
          <v-card-title primary-title> Ratings </v-card-title>
          <pre>
            {{ courseDetails.ratings }}
          </pre>
        </v-card>
      </v-col>
    </v-row>
    <pre>
      {{ courseDetails }}
    </pre>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getters, actions } from '../../store/types'
export default {
  props: ['courseId'],
  data: () => ({
    //
  }),
  methods: {
    ...mapActions({ fetchCourseDetails: actions.FETCH_COURSE_DETAILS }),
  },
  computed: {
    ...mapGetters({ courseDetails: getters.GET_STUDENT_COURSE_DETAILS }),
    shouldShowButtons() {
      return true
    },
    shouldShowCommentButton() {
      return true
    },
    isDiscounted() {
      return true
    },
  },
  created() {
    this.fetchCourseDetails({ courseId: this.courseId })
  },
  watch: {},
}
</script>
