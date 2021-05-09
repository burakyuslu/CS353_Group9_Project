<template>
  <v-container class="grey lighten-5">
    <v-row v-resize="onResize">
      <v-col cols="8">
        <v-row>
          <v-col>
            <v-card class="d-flex" outlined tile>
              <v-card-title>
                VIDEO
              </v-card-title>
              <div>
                <youtube
                  :player-width="playerWidth"
                  :player-height="playerHeight"
                  :video-id="videoId"
                ></youtube>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card class="pa-5">
              <v-tabs v-model="tab" background-color="indigo" grow>
                <v-tab>
                  QnA
                </v-tab>
                <v-tab> Notes </v-tab>
                <v-tab> Announcements </v-tab>
                <v-tab>
                  Assignments
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item key="0">
                  <v-container> <qna></qna></v-container>
                </v-tab-item>
                <v-tab-item key="1">
                  <v-container>
                    <notes> </notes>
                  </v-container>
                </v-tab-item>
                <v-tab-item key="2">
                  <v-container>
                    <announcement> </announcement>
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
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Announcement from '../../components/Announcement.vue'
import Notes from '../../components/Notes.vue'
import qna from '../../components/QnA.vue'
export default {
  components: { Announcement, Notes, qna},
  name: 'Lecture',
  data() {
    return {
      tab: 0,
      windowSize: {
        x: 0,
        y: 0,
      },
      url: 'https://www.youtube.com/watch?v=qZXt1Aom3Cs',
    }
  },
  mounted() {
    this.onResize()
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
  },
  computed: {
    videoId() {
      return this.$youtube.getIdFromURL(this.url)
    },
    playerHeight() {
      return (this.windowSize.y * 500) / 937
    },
    playerWidth() {
      return (this.windowSize.x / 1920) * 900
    },
  },
}
</script>

<style scoped></style>
