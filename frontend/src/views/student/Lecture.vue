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
                  </v-card-title>
                  <div>
                    <v-card-text>
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
                Completed:
                {{ lectureContent.completedLectures.length }} /
                {{ lectureContent.lectures.length }}
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
  </div>
</template>

<script>
import Announcement from '../../components/Announcement.vue'
import Notes from '../../components/Notes.vue'
import qna from '../../components/QnA.vue'
import { mapActions, mapGetters } from 'vuex'
import { getters, actions } from '../../store/types'
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'
export default {
  components: { Announcement, Notes, qna },
  name: 'Lecture',
  props: ['courseId', 'lectureId'],
  data() {
    return {
      tab: 0,
      windowSize: {
        x: 0,
        y: 0,
      },
      url: 'https://www.youtube.com/watch?v=qZXt1Aom3Cs',
      lectureLoading: true,
    }
  },
  mounted() {
    this.onResize()
  },

  methods: {
    ...mapActions(['fetchLectureContent', 'completeLecture']),
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
