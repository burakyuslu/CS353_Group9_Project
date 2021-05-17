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
                  v-model="search.searchText"
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
        <v-row v-for="item in items" :key="item.course_name">
          <v-col>
            <v-card outlined tile>
              <v-card-title
                class="text-h5"
                v-text="item.course_name"
              ></v-card-title>
              <v-card-text align-start>
                <div class="text--primary">
                  <p>Price: {{ item.price }}</p>
                  <p>
                    Summary: {{ item.course_summary.substring(0, 100) }} ...
                  </p>
                </div>
                <v-spacer> </v-spacer>
              </v-card-text>
              <v-card-subtitle
                v-text="`by ${item.name} ${item.surname}`"
              ></v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :to="{
                    name: 'student.course',
                    params: { courseId: item.course_id },
                  }"
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                >
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
            <v-card>
              <v-card-title>
                Filter Results
              </v-card-title>
              <v-container>
                <v-text-field
                  v-model="search.ratingRange[0]"
                  type="number"
                  label="Price Greater Than"
                ></v-text-field>

                <v-text-field
                  v-model="search.ratingRange[1]"
                  type="number"
                  label="Price Less Than"
                ></v-text-field>

                <!-- <v-select
                  v-model="search.selectedCategories"
                  :items="categoryItems"
                  chips
                  label="Categories"
                  multiple
                  outlined
                ></v-select>
                <v-select
                  v-model="search.selectedCourses"
                  :items="courseTypes"
                  chips
                  label="Courses"
                  multiple
                  outlined
                ></v-select>
                <v-select
                  v-model="search.sort"
                  :items="sortTypes"
                  item-text="state"
                  label="Sort"
                  return-object
                  single
                  outlined
                ></v-select> -->

                <!-- <v-subheader>Ratings</v-subheader>

                <v-range-slider
                  :tick-labels="[0, 1, 2, 3, 4, 5]"
                  v-model="search.ratingRange"
                  min="0"
                  max="5"
                  ticks="always"
                  tick-size="4"
                >
                </v-range-slider> -->
                <!-- <v-btn>Clear Filters</v-btn> -->
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getters, actions } from '../../store/types.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'StudentHome',
  methods: {
    ...mapActions({ fetchCourses: actions.FETCH_COURSE_LIST }),
    async fetchData() {
      if (!this.awaitingSearch) {
        const fun = async () => {
          if (this.search.searchText === '') {
            await this.fetchCourses({
              ratingLow: this.search.ratingRange[0],
              ratingHigh: this.search.ratingRange[1],
            })
          } else {
            await this.fetchCourses({
              search: this.search.searchText,
              ratingLow: this.search.ratingRange[0],
              ratingHigh: this.search.ratingRange[1],
            })
          }
          this.awaitingSearch = false
        }

        setTimeout(fun, 500) // 0.5 sec delay
      }
      this.awaitingSearch = true
    },
  },
  watch: {
    search: {
      deep: true,
      handler: 'fetchData',
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({ courses: getters.GET_COURSES_STUDENT_HOME }),
    items() {
      return this.courses
    },
  },
  data() {
    return {
      awaitingSearch: false,
      search: {
        searchText: '',
        priceLessThan: 20,
        priceGreaterThan: 10,
        ratingRange: [0, 150],
        selectedCategories: [],
        selectedCourses: [],
        sort: 'Alphetical A-Z',
      },
      categoryItems: ['Programming', 'Design', 'Vue', 'Vuetify'],
      courseTypes: ['Free', 'Paid', 'Discounted'],
      sortTypes: ['Price Descending', 'Price Ascending', 'Alphetical A-Z'],
      min: 0,
      max: 90,
      range: [0, 70],
    }
  },
}
</script>
