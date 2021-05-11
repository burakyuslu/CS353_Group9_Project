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
        <v-row v-for="item in courses" :key="item.course_name">
          <v-col>
            <v-card outlined tile>
              <v-card-title v-text="item.course_name"></v-card-title>
              <v-card-text align-start>
                <div class="text--primary">
                  <p>price: {{ item.price }}</p>
                  <p>summary: {{ item.summary }}</p>
                  <p>publication date: {{ item.publish_date }}</p>
                </div>
                <v-spacer> </v-spacer>
              </v-card-text>
              <v-card-subtitle
                v-text="`instructor ${item.instructor_id}`"
              ></v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="true" class="ml-2 mt-5" outlined rounded small>
                  request refund
                </v-btn>
                <v-btn v-if="true" class="ml-2 mt-5" outlined rounded small>
                  view certificate
                </v-btn>
                <v-btn class="ml-2 mt-5" outlined rounded small>
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
            <v-row v-for="item in courses" :key="item.course_name">
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
                      @click="unwish({ courseId: item.course_id })"
                    >
                      Remove
                    </v-btn>
                    <v-btn class="ml-2 mt-5" outlined rounded small>
                      go to course
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
import { mapActions, mapGetters } from 'vuex'
import { getters, actions } from '../../store/types.js'
export default {
  data() {
    return {
      myCourses: [],
    }
  },
  methods: {
    ...mapActions({
      fetchUserProfile: actions.FETCH_USER_PROFILE_DATA,
      unwish: actions.UNWISH_COURSE,
      requestRefund: actions.REQUEST_REFUND,
    }),
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
      return this.userProfileData.wishlist
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
