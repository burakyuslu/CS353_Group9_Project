<template>
  <div>
    <div v-if="loading">
      Loading
    </div>
    <v-container v-else class="grey lighten-5">
      <v-row no-gutters>
        <v-col>
          <v-card outlined tile>
            <pre>
            {{ courseDetails.course && courseDetails.course.course_name }}
          </pre
            >
          </v-card>
        </v-col>
        <v-col order="12">
          <v-card class="pa-5" outlined tile>
            {{ courseDetails && courseDetails.avgRating }}/5.0 <br />
            ({{ courseDetails && courseDetails.ratingCount }} ratings)
            <br />
            {{ courseDetails && courseDetails.studentCount }} students
          </v-card>
        </v-col>
        <v-col order="1">
          <v-card class="pa-5">
            <div
              v-if="!courseDetails.studentCourses.includes(Number(courseId))"
            >
              <p>
                The price of the course is ${{
                  courseDetails.course && courseDetails.course.price
                }}.
              </p>
              <p v-if="isDiscounted">
                But it is now down to ${{
                  courseDetails.course.price *
                    ((100 - courseDetails.course.percentage) / 100)
                }}.
              </p>
              <br />
              <v-dialog
                v-if="courses && !courses.includes(courseId)"
                v-model="dialog"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Buy Now
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Checkout</span>
                  </v-card-title>
                  <v-card-text v-if="courseDetails.course">
                    <p>Your Balance: {{ user.balance }}</p>
                    <p v-if="isDiscounted">
                      Price: ${{
                        courseDetails.course.price *
                          ((100 - courseDetails.course.percentage) / 100)
                      }}.
                    </p>
                    <p v-else>Price: ${{ courseDetails.course.price }}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="buyCourse">
                      Buy
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-alert class="mt-2" v-model="bought" type="success" dismissible>
                You have successfully purchased this course.
              </v-alert>
              <v-alert v-model="errorOccured" type="error" dismissible>
                Your balance is not enough.
              </v-alert>
              <br />
              <v-btn
                v-if="
                  courseDetails.wishlist &&
                    !courseDetails.wishlist.includes(
                      courseDetails.course.course_id,
                    )
                "
                @click="addToWishlist"
                >ADD TO WISHLIST</v-btn
              >
            </div>
            <div
              v-else-if="
                courseDetails.lectures && courseDetails.lectures.length !== 0
              "
            >
              <p>You have this course.</p>
              <v-btn
                link
                :to="{
                  name: 'student.lecture',
                  params: { lectureId: courseDetails.lectures[0].lecture_id },
                }"
                color="primary"
              >
                Go To The Course
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-card class="pa-5" outlined tile>
            <v-card-title>
              Lectures
            </v-card-title>
            <v-card-text
              v-if="
                courseDetails &&
                  courseDetails.lectures &&
                  courseDetails.lectures.length === 0
              "
            >
              No Lectures Yet!
            </v-card-text>
            <v-list-item
              v-else
              v-for="item in courseDetails.lectures"
              :key="item.title"
              :to="getPath(item)"
              link
            >
              <v-chip
                v-if="
                  shouldShowStudentButtons &&
                    courseDetails.completedLectures &&
                    courseDetails.completedLectures.includes(item.lecture_id)
                "
                class="pa-2 ma-2"
                color="green"
                text-color="white"
              >
                Done
              </v-chip>

              <v-list-item-content class="text-left">
                <v-list-item-title>{{ item.lecture_name }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col order="12">
          <v-card class="pa-5" outlined tile>
            <pre>
          {{ courseDetails.course && courseDetails.course.course_summary }}

          </pre
            >
          </v-card>
          <v-card outlined tile>
            <v-card-title primary-title> Ratings </v-card-title>
            <v-card
              v-for="rating in courseDetails.ratings"
              :key="`${rating.studentName}_${rating.comment}`"
            >
              <v-rating
                color="primary"
                hover
                length="5"
                readonly
                size="32"
                :value="rating.rating"
              ></v-rating>
              <v-card-subtitle>
                {{ rating.studentName }}
              </v-card-subtitle>
              <v-card-text v-if="rating.comment">
                {{ rating.comment }}
              </v-card-text>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getters, actions } from '../../store/types'
import axios from '../../utils/config.js'
export default {
  props: ['courseId'],
  data: () => ({
    //
    dialog: false,
    assignments: [],
    loading: true,
    adminData: {
      refundRequests: [],
      discontables: [],
    },
    bought: false,
    errorOccured: false,
  }),
  methods: {
    ...mapActions({
      fetchCourseDetails: actions.FETCH_COURSE_DETAILS,
      wish: 'addToWishlist',
      fetchUserProfile: actions.FETCH_USER_PROFILE_DATA,
      buy: 'buyCourse',
    }),
    async buyCourse() {
      const error = await this.buy({ courseId: this.courseId })
      if (error) {
        this.errorOccured = true
        this.bought = false
      } else {
        this.errorOccured = false
        this.bought = true
      }

      this.fetchCourseDetails({ courseId: this.courseId })
      this.fetchUserProfile()
      this.dialog = false
    },
    saveAssignment: async () => {
      try {
        const res = await axios.post('courses/assignments', {
          data: this.assignments,
        })
      } catch (error) {
        console.log(error.message)
      }
    },

    getPath(item) {
      if (
        this.courseDetails.studentCourses &&
        this.courseDetails.studentCourses.includes(this.courseId)
      ) {
        return {
          name: 'student.lecture',
          params: { lectureId: item.lecture_id },
        }
      } else {
        return ''
      }
    },
    async addToWishlist() {
      await this.wish({ courseId: this.courseDetails.course.course_id })
      await this.fetchCourseDetails({ courseId: this.courseId })
    },
  },
  computed: {
    ...mapGetters({
      courseDetails: getters.GET_STUDENT_COURSE_DETAILS,
      userProfileData: getters.GET_STUDENT_PROFILE_DATA,
    }),
    shouldShowStudentButtons() {
      return true
    },
    shouldShowCommentButton() {
      return true
    },
    isDiscounted() {
      if (this.courseDetails.course === undefined) return false
      return (
        this.courseDetails.course.percentage > 0 &&
        this.courseDetails.course.discountable == 1
      )
    },
    courses() {
      // profile data includes : courses, refundRequests, wishlist, certificates
      console.log(this.courseDetails.studentCourses)
      return this.courseDetails.studentCourses || []
      // if (this.userProfileData.courses === undefined) return []
      // return courseDetails.courses.map(c => c.course_id)
    },
    user() {
      // profile data includes : courses, refundRequests, wishlist, certificates
      return (
        this.userProfileData.profile || {
          user_id: 1,
          name: '',
          surname: '',
          email_address: '',
          balance: 0,
          reg_date: '',
        }
      )
    },
  },
  async created() {
    this.loading = true
    console.log('here')
    await this.fetchCourseDetails({ courseId: this.courseId })
    await this.fetchUserProfile()
    this.loading = false
  },
  watch: {
    dialog(newValue) {
      if (newValue) {
        this.fetchUserProfile()
      }
    },
  },
}
</script>
