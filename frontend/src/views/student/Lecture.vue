<template>
  <div>
    <div v-if="lectureLoading"><p>Loading...</p></div>
    <div v-else>
      <v-container class="grey lighten-5">
        <v-row v-resize="onResize">
          <v-col cols="8">
            <v-row>
              <v-col>
                <v-card outlined tile>
                  <v-card-title>
                    {{ lectureContent.content.lecture_name }}
                    <v-spacer> </v-spacer>
                    <div v-if="completedActivities === totalActivities">
                      <v-btn
                        @click="earn"
                        v-if="lectureContent.certificate.length === 0"
                        >Earn Certificate</v-btn
                      >
                      <v-btn v-else link :to="getCertificatePath"
                        >View Certificate</v-btn
                      >
                      <v-btn color="primary" dark @click="dialog = true">
                        Comment & Rate
                      </v-btn>
                    </div>
                  </v-card-title>

                  <v-dialog v-model="dialog" width="666">
                    <div v-if="ratings.length > 0">
                      <v-card
                        v-for="rating in ratings"
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
                    </div>
                    <v-card class="elevation-16 mx-auto" v-else>
                      <v-card-title class="headline">
                        Comment & Rate
                      </v-card-title>
                      <v-rating
                        color="primary"
                        hover
                        length="5"
                        readonly
                        size="32"
                        :value="rating.rating"
                      ></v-rating>
                      <v-text-field
                        label="Comment Here"
                        v-model="commentRate.comment"
                      >
                      </v-text-field>

                      <v-divider></v-divider>
                      <v-card-actions class="justify-space-between">
                        <v-btn text v-on:click="dialog = false">
                          Close
                        </v-btn>
                        <v-btn
                          color="primary"
                          text
                          v-on:click="
                            commentAndRate(
                              commentRate.comment,
                              commentRate.rate,
                            )
                          "
                        >
                          Rate Now
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <div>
                    <v-card-text class="text-md-center">
                      <youtube
                        :player-width="playerWidth"
                        :player-height="playerHeight"
                        :video-id="videoId(lectureContent.content.content)"
                      ></youtube>
                    </v-card-text>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card class="pa-5">
                  <v-tabs v-model="tab" grow>
                    <v-tab>
                      Q&A
                    </v-tab>
                    <v-tab> Announcements </v-tab>
                    <v-tab>
                      Assignments
                    </v-tab>
                    <v-tab> Notes </v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tab">
                    <v-tab-item key="0">
                      <v-container>
                        <qna
                          :threads="lectureContent.qna"
                          :courseId="courseId"
                          :lectureId="lectureId"
                        ></qna
                      ></v-container>
                    </v-tab-item>
                    <v-tab-item key="2">
                      <v-container>
                        <announcement
                          :announcements="lectureContent.announcements"
                        >
                        </announcement>
                      </v-container>
                    </v-tab-item>
                    <v-tab-item key="3">
                      <v-container
                        ><v-card>
                          <v-card-title>
                            Quizzes
                          </v-card-title>
                          <v-list-item
                            v-for="item in lectureContent.quizzes"
                            :key="item.quiz_name"
                            :to="getQuizPath(item)"
                            link
                          >
                            <v-chip
                              v-if="false"
                              class="pa-2 ma-2"
                              color="green"
                              text-color="white"
                            >
                              Done
                            </v-chip>

                            <v-list-item-content class="text-left">
                              <v-list-item-title
                                >{{ item.quiz_name }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                      </v-container>
                    </v-tab-item>
                    <v-tab-item key="4">
                      <v-container>
                        <notes
                          :notes="lectureContent.notes"
                          :courseId="courseId"
                          :lectureId="lectureId"
                        >
                        </notes>
                      </v-container>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="4">
            <v-card>
              <v-card-title>
                Videos
                <v-spacer></v-spacer>
                Completed Activities:
                {{ completedActivities }}
                /
                {{ totalActivities }}
              </v-card-title>
              <v-list-item
                v-for="item in lectureContent.lectures"
                :key="item.title"
                :to="getPath(item)"
                link
              >
                <v-chip
                  v-if="
                    shouldShowStudentButtons &&
                      lectureContent.completedLectures &&
                      lectureContent.completedLectures.includes(item.lecture_id)
                  "
                  class="pa-2 ma-2"
                  color="green"
                  text-color="white"
                >
                  Done
                </v-chip>

                <v-list-item-content class="text-left">
                  <v-list-item-title
                    >{{ item.lecture_name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <pre>
    {{ commentRate }}
  </pre
    >
  </div>
</template>

<script>
import Announcement from '../../components/Announcement.vue'
import Notes from '../../components/Notes.vue'
import qna from '../../components/QnA.vue'
import { mapActions, mapGetters } from 'vuex'
import axios from '../../utils/config'
export default {
  components: { Announcement, Notes, qna },
  name: 'Lecture',
  props: ['courseId', 'lectureId'],
  data() {
    return {
      dialog: false,
      rating: 4.5,
      tab: 0,
      windowSize: {
        x: 0,
        y: 0,
      },
      url: 'https://www.youtube.com/watch?v=qZXt1Aom3Cs',
      lectureLoading: true,
      commentRate: {
        comment: '',
        rate: 0,
      },
    }
  },
  mounted() {
    this.onResize()
  },

  methods: {
    ...mapActions([
      'fetchLectureContent',
      'completeLecture',
      'earnCertificate',
    ]),

    async commentAndRate(comment, rate) {
      await axios.post(`courses/${this.$route.params.courseId}/ratings`, {
        comment: comment,
        rating: rate,
      })
    },
    async earn() {
      await this.earnCertificate({ courseId: this.courseId })
      await this.fetchLectureContent({
        courseId: this.courseId,
        lectureId: this.lectureId,
      })
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    getPath(item) {
      return {
        name: 'student.lecture',
        params: { lectureId: item.lecture_id },
      }
    },
    getQuizPath(item) {
      return {
        name: 'student.quiz',
        params: { quizId: item.quiz_id },
      }
    },
    videoId(url) {
      return this.$youtube.getIdFromURL(url)
    },
  },
  computed: {
    ...mapGetters({ lectureContent: 'getLectureContent' }),
    getCertificatePath() {
      return {
        name: `student.certificate`,
        params: {
          certificateId: this.lectureContent.certificate[0].certificate_id,
        },
      }
    },
    completedActivities() {
      return (
        this.lectureContent.completedLectures.length +
        this.lectureContent.answers.length
      )
    },
    totalActivities() {
      return (
        this.lectureContent.lectures.length + this.lectureContent.quizzes.length
      )
    },
    playerHeight() {
      return (this.windowSize.y * 500) / 937
    },
    shouldShowStudentButtons() {
      return true
    },
    playerWidth() {
      return (this.windowSize.x / 1920) * 900
    },
  },
  async created() {
    this.lectureLoading = true
    const { data } = await axios.get(`courses/${this.courseId}/ratings`)
    this.ratings = data.ratings || []
    const error = await this.fetchLectureContent({
      courseId: this.courseId,
      lectureId: this.lectureId,
    })
    if (!this.lectureContent.completedLectures.includes(this.lectureId)) {
      const error = await this.completeLecture({
        courseId: this.courseId,
        lectureId: this.lectureId,
      })
    }
    await this.fetchLectureContent({
      courseId: this.courseId,
      lectureId: this.lectureId,
    })
    if (error) {
      console.log(error)
    }

    this.lectureLoading = false
  },
  watch: {
    async dialog(newValue) {
      if (newValue) {
        const { data } = await axios.get(`courses/${this.courseid}/ratings`)
        this.ratings = data.ratings || []
      }
    },
    async lectureId() {
      if (!this.lectureContent.completedLectures.includes(this.lectureId)) {
        const error = await this.completeLecture({
          courseId: this.courseId,
          lectureId: this.lectureId,
        })
      }
      const error = await this.fetchLectureContent({
        courseId: this.courseId,
        lectureId: this.lectureId,
      })
      if (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped></style>
