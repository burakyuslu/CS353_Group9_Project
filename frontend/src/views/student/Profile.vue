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

        <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
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
                v-text="`instructor ${item.instructor_name} ${item.instructor_surname}`"
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
      dialog,
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
