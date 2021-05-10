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
                <v-btn class="ml-2 mt-5" outlined rounded small>
                  Go To Announcements
                </v-btn>

                <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      Add Assignment
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Add Assignment</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">
                          Save
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>

                    <v-list three-line subheader>
                      <v-subheader>Add Questions Here</v-subheader>
                    </v-list>
                  </v-card>
                </v-dialog>

                <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      Add Lecture
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Add Lecture</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">
                          Save
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>

                    <v-list three-line subheader>
                      <v-subheader>Add Lectures Here</v-subheader>
                    </v-list>
                  </v-card>
                </v-dialog>

                <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      Go To Course Forum
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Go To Course Forum </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">
                          Save
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>

                    <v-list three-line subheader>
                      <v-subheader>Forum</v-subheader>
                    </v-list>
                  </v-card>
                </v-dialog>

                <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      Edit Certificate
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Edit Certificate</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">
                          Save
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>

                    <v-list three-line subheader>
                      <v-subheader>Edit Certificate Here</v-subheader>
                    </v-list>
                  </v-card>
                </v-dialog>

                <v-btn class="ml-2 mt-5" outlined rounded small>
                  Go To Course
                </v-btn>
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
export default {
  name: 'InstructorHome',
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
    }
  },
  components: {},
}
</script>
