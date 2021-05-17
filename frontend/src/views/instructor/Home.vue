<template>
  <div>
    <div v-if="loading"></div>
    <v-container v-else class="grey lighten-5">
      <v-row>
        <!-- Courses -->
        <v-col cols="8">
          <v-row>
            <v-col>
              <router-link to="/instructor/home/create">
                <v-btn class="ml-2 mt-5" outlined rounded small>
                  Create A New Course
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
          <v-alert class="mt-2" v-model="announced" type="success" dismissible>
            Announcement posted.
          </v-alert>
          <v-alert v-model="errorOccured" type="error" dismissible>
            An error occured while posting the announcement
          </v-alert>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template> </template>
            <v-card>
              <v-card-title>
                <span class="headline">Make an Announcement</span>
              </v-card-title>
              <v-container>
                <v-text-field
                  label="Write your announcement here..."
                  v-model="announcement"
                  required
                >
                </v-text-field>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-btn color="green" text @click="makeAnnouncement">
                    Post
                  </v-btn>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-dialog>
          <v-row v-for="(course, i) in courses" :key="i">
            <v-col>
              <v-card outlined tile>
                <v-card-title
                  class="text-h5"
                  v-text="course.course_name"
                ></v-card-title>
                <v-card-text align-start>
                  <div class="text--primary">
                    Category: {{ course.category }}
                  </div>
                  <v-spacer> </v-spacer>
                </v-card-text>
                <v-card-subtitle
                  v-text="course.course_summary"
                ></v-card-subtitle>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="openDialog(course)"
                  >
                    Make an Announcement
                  </v-btn>

                  <router-link
                    :to="{
                      name: 'instructor.home.addAssignment',
                      params: { courseId: course.course_id },
                    }"
                  >
                    <v-btn class="ml-2 mt-5" outlined rounded small>
                      Add Assignment
                    </v-btn>
                  </router-link>

                  <router-link
                    :to="{
                      name: 'instructor.home.addLecture',
                      params: { courseId: course.course_id },
                    }"
                  >
                    <v-btn class="ml-2 mt-5" outlined rounded small>
                      Add Lecture
                    </v-btn>
                  </router-link>

                  <router-link
                    :to="{
                      name: 'instructor.home.goToCourseForum',
                      params: { courseId: course.course_id },
                    }"
                  >
                    <v-btn class="ml-2 mt-5" outlined rounded small>
                      Go To Course Forum
                    </v-btn>
                  </router-link>
                  <!--
                <router-link to="/instructor/home/editcertificate">
                  <v-btn class="ml-2 mt-5" outlined rounded small>
                    Edit Certificate
                  </v-btn>
                </router-link>

                <router-link to="/course">
                  <v-btn class="ml-2 mt-5" outlined rounded small>
                   Go To Course
                  </v-btn>
                </router-link> -->
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col>
              <!-- <v-card class="pa-10">
              <v-card-title>
                Price Filters
              </v-card-title>
            </v-card> -->
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from '../../utils/config.js'
export default {
  name: 'InstructorHome',
  methods: {
    search() {
      axios.post('courses/courseId/assignments', {
        searchText: this.searchText,
      })
      this.$router.go(-1)
    },
    async makeAnnouncement(courseId) {
      try {
        await axios.post(`courses/${this.dialogItem.course_id}/announcements`, {
          courseId: this.dialogItem.course_id,
          announcementText: this.announcement,
        })
        this.dialog = false
        this.announced = true
        this.errorOccured = false
      } catch (exception) {
        this.announced = false
        this.errorOccured = true
        console.log(exception)
      }
    },
    openDialog(item) {
      this.dialogItem = item
      console.log(item)
      this.dialog = true
    },
  },
  async mounted() {
    this.loading = true
    const response = await axios.get('users/instructor/courses')
    this.courses = response.data
    this.loading = false
  },
  data() {
    return {
      selectedCategories: ['Vuetify', 'Programming'],
      categoryItems: ['Programming', 'Design', 'Vue', 'Vuetify'],
      searchText: '',
      min: 0,
      max: 90,
      range: [0, 70],
      dialog: false,
      announcement: '',
      courses: [],
      errorOccured: false,
      announced: false,
      loading: true,
      dialogItem: '',
    }
  },
  components: {},
}
</script>
