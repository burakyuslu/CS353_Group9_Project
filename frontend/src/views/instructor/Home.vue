<template>
  <v-container class="grey lighten-5">
    <v-row>
      <!-- Courses -->
      <v-col cols="8">
        <v-row>
          <v-col>
            <v-card class="d-flex" outlined tile>
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
            <v-card class="d-flex" outlined>
              <v-btn class="ml-2 mt-5" outlined rounded small>
                Create Course
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-for="(item, i) in items" :key="i">
          <v-col>
            <v-card class="d-flex" outlined tile>
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
                  Go To Course Forum
                </v-btn>

                <v-btn class="ml-2 mt-5" outlined rounded small>
                  Edit Certificate
                </v-btn>

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
    }
  },
  components: {},
}
</script>

