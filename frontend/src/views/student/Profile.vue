<template>
  <v-container class="grey lighten-5">
    <v-row>
      <!-- Courses -->
      <v-col cols="8">
        <v-row>
          <v-col>
            <v-card outlined tile>
              <v-card-title>
                Profile
              </v-card-title>
              <v-container grid-list-xs>
                <!-- <v-card-text> -->
                <p>Full Name: {{ `${user.name || ''} ${user.surname}` }}</p>
                <p>Email: {{ user.email_address }}</p>

                <p>Balance: {{ user.balance }}</p>
                <p>Number of courses: {{ courses.length }}</p>
                <p>Registration Date: {{ user.reg_date }}</p>
                <!-- </v-card-text> -->
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-card class="mt-12" outlined tile>
          <v-card-title>
            My Courses
          </v-card-title>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">User Profile</span>
            </v-card-title>
              <v-container>
                  <v-text-field label="Please specify your reason" v-model="reasonText">
                  </v-text-field>
                <small>*indicates required field</small>
              </v-container>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="postRefundRequest()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row v-for="item in courses" :key="item.course_name">
          <v-col>
            <v-card outlined tile>
              <v-card-title v-text="item.course_name"></v-card-title>
              <v-card-text align-start>
                <div class="text--primary">
                  <p>price: {{ item.price }}</p>
                  <p>summary: {{ item.course_summary }}</p>
                  <p>publication date: {{ item.buy_date }}</p>
                </div>
                <v-spacer> </v-spacer>
              </v-card-text>
              <v-card-subtitle
                v-text="
                  `instructor ${item.instructor_name} ${item.instructor_surname}`
                "
              ></v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="true"
                  @click="openDialog(item)"
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small

                >
                  request refund
                </v-btn>
                <v-btn v-if="true" class="ml-2 mt-5" outlined rounded small>
                  view certificate
                </v-btn>
                <v-btn
                  :to="goToCourse(item)"
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                >
                  go to course
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                Wishlist
              </v-card-title>
            </v-card>
            <v-row
              v-for="item in wishlist.filter(
                w => !courses.map(c => c.course_id).includes(w.course_id),
              )"
              :key="item.course_name"
            >
              <v-col>
                <v-card outlined tile>
                  <v-card-title v-text="item.course_name"></v-card-title>
                  <v-card-text>
                    <p>price: {{ item.price }}</p>
                    <p>summary: {{ item.summary }}</p>
                    <p>publication date: {{ item.publish_date }}</p>
                    <v-spacer> </v-spacer>
                  </v-card-text>
                  <v-card-subtitle
                    v-text="`instructor ${item.instructor_id}`"
                  ></v-card-subtitle>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      @click="removeFromWishlist(item.course_id)"
                    >
                      Remove
                    </v-btn>
                    <v-btn
                      :to="goToCourse(item)"
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                    >
                      Go to course
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../../utils/config.js'
import { mapActions, mapGetters } from 'vuex'
import { getters, actions } from '../../store/types.js'
export default {
  data() {
    return {
      myCourses: [],
      dialog: false,
      dialogItem: {},
      reasonText: '',
    }
  },
  methods: {
    ...mapActions({
      fetchUserProfile: actions.FETCH_USER_PROFILE_DATA,
      unwish: actions.UNWISH_COURSE,
      requestRefund: actions.REQUEST_REFUND,
    }),
    goToCourse(item) {
      console.log(item)
      return {
        name: 'student.course',
        params: { courseId: item.course_id },
      }
    },
    openDialog(item) {
      this.dialogItem = item
      console.log(item)
      this.dialog = true
    },
    async removeFromWishlist(courseId) {
      await this.unwish({ courseId })
      await this.fetchUserProfile()
    },
    async postRefundRequest(){
      await axios.post("users/requestRefund", {courseId: this.dialogItem.course_id,  reason: this.reasonText})
      this.dialog = false
      this.reasonText = ''
    }
  },
  computed: {
    ...mapGetters({
      notifications: getters.GET_STUDENT_NOTIFICATIONS,
      userProfileData: getters.GET_STUDENT_PROFILE_DATA,
    }),
    courses() {
      // profile data includes : courses, refundRequests, wishlist, certificates
      return this.userProfileData.courses || []
    },
    wishlist() {
      // profile data includes : courses, refundRequests, wishlist, certificates
      return this.userProfileData.wishlist || []
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
  watch: {
    notifications: {
      deep: true,
      handler: 'fetchUserProfile',
      immediate: true,
    },
  },
}
</script>

<style></style>
