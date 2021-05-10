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
        <v-row v-for="(item, i) in items" :key="i">
          <v-col>
            <v-card  outlined tile>
              <v-card-title class="text-h5" v-text="item.title"></v-card-title>
              <v-card-text align-start>
                <div class="text--primary">
                  dasdk
                </div>
                <v-spacer> </v-spacer>
              </v-card-text>
              <v-card-subtitle v-text="item.artist"></v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>
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
  name: 'StudentHome',
  data() {
    return {
      selectedCategories: ['Vuetify', 'Programming'],
      categoryItems: ['Programming', 'Design', 'Vue', 'Vuetify'],
      searchText: '',
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
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
