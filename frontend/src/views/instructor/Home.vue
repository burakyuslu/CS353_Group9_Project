<template>
  <v-container class="grey lighten-5">
    <v-row>
      <!-- Courses -->
      <v-col cols="8">
        <v-row>
          <v-col>
            <v-card outlined tile>
              <v-container>
                <v-text-field
                  v-model="searchText"
                  label="Search"
                  hide-details="auto"
                >
                  <v-icon slot="append">
                    mdi-magnify
                  </v-icon>
                </v-text-field>
              </v-container>
              <v-container>
                <v-btn class="ml-2 mt-5" outlined rounded small @click="search">
                  Search
                </v-btn>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <router-link to="/instructor/home/create">
              <v-btn class="ml-2 mt-5" outlined rounded small>
                Create A New Course
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
        <v-row v-for="(item, i) in items" :key="i">
          <v-col>
            <v-card outlined tile>
              <v-card-title class="text-h5" v-text="item.title"></v-card-title>
              <v-card-text align-start>
                <div class="text--primary">
                  Instructor Name
                </div>
                <v-spacer> </v-spacer>
              </v-card-text>
              <v-card-subtitle v-text="item.artist"></v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          class="ml-2 mt-5"
                          outlined
                          rounded
                          small
                          v-bind="attrs"
                          v-on="on"
                      >
                        Make an Announcement
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Make an Announcement</span>
                      </v-card-title>
                      <v-container>
                         <v-text-field label="Write your announcement here..." v-model="announcement" required>
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



                <router-link to="/instructor/home/addassignment">
                  <v-btn class="ml-2 mt-5" outlined rounded small>
                    Add Assignment
                  </v-btn>
                </router-link>


                <router-link to="/instructor/home/addlecture">
                  <v-btn class="ml-2 mt-5" outlined rounded small>
                    Add Lecture
                  </v-btn>
                </router-link>

                <router-link to="/instructor/home/gotocourseforum">
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
</template>

<script>

import axios from '../../utils/config.js'
export default {
  name: 'InstructorHome',
  methods: {
    search() {
      axios.post('courses/courseId/assignments', { searchText: this.searchText })
      this.$router.go(-1)
    },
    makeAnnouncement(){
      axios.post('courses/3/announcements', {announcementText: this.announcement})
      this.dialog = false
      //axios.get('users/instructor/courses').then(res => {console.log(res[0])})
    }
  },
  data() {
    return {
      selectedCategories: ['Vuetify', 'Programming'],
      categoryItems: ['Programming', 'Design', 'Vue', 'Vuetify'],
      searchText: '',
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Course 1',
          artist: 'Course 1 - Info',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Course 2',
          artist: 'Course 2 - Info',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Course 3',
          artist: 'Course 3 - Info',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Course 4',
          artist: 'Course 4 - Info',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Course 5',
          artist: 'Course 5 - Info',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Course 6',
          artist: 'Course 6 - Info',
        },
      ],
      min: 0,
      max: 90,
      range: [0, 70],
      dialog: false,
      announcement: ''
    }
  },
  components: {},
}
</script>
