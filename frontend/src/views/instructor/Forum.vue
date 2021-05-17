<template>
  <div>
    <section v-if="showPart == 1">
      <h3>Q&A For {{ courseTitle }}</h3>
      <v-card v-for="thread in threads" :key="thread.id" outlined>
        <v-card-title class="headline mb-1">
          {{ thread.title }}
        </v-card-title>
        <v-card-text> by {{ thread.creator }} </v-card-text>
        <v-card-actions>
          <v-btn outlined text v-on:click="seeThread(thread.id)">
            See Thread
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-btn class="mt-2" outlined text v-on:click="goToCreateNewThread">
        Create New Thread
      </v-btn>
    </section>
    <section v-else-if="showPart == 2">
      <h3>Viewing Thread: {{ threadTitle }}</h3>
      <v-card v-for="entry in entries" :key="entry.content" outlined>
        <v-card-title class="headline mb-2">
          {{ entry.poster }} Says:
        </v-card-title>
        <v-card-text>
          {{ entry.content }}
        </v-card-text>
      </v-card>
      <v-card>
        <div>
          <v-textarea
            class="ma-2"
            v-model="userEnteredAnswer"
            placeholder="Post an answer"
          ></v-textarea>
        </div>
        <v-btn outlined text v-on:click="postAnswer">
          Post Answer
        </v-btn>
        <v-btn outlined text v-on:click="goBackToThreads">
          Go Back
        </v-btn>
      </v-card>
    </section>
    <section class="ma-2" v-else>
      <h3>Create A New Thread In {{ courseTitle }}</h3>
      <p>Ask your question. This will also be your thread's title:</p>
      <div>
        <v-textarea
          class="ma-2"
          v-model="userEnteredThreadTitle"
          placeholder="Your question goes in here..."
        ></v-textarea>
      </div>
      <v-btn outlined text v-on:click="createNewThread">
        Create New Thread
      </v-btn>
      <v-btn outlined text v-on:click="goBackToThreads">
        Go Back
      </v-btn>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import axios from '../../utils/config.js'
export default {
  components: {},
  props: ['courseId', 'lectureId'],
  data() {
    return {
      // shownPart=1 -> show threads, shownPart=2 -> show selected Thread, shownPart=3-> show create a new thread screen
      showPart: 1,
      selectedThreadId: 1,
      courseTitle: 'Databases',
      threadTitle: 'no thread selected',
      userEnteredThreadTitle: '',
      userEnteredAnswer: '',
      selectedThreadIndex: -1,
      entries: [],
      threads: [],
    }
  },
  computed: {},
  methods: {
    ...mapActions([
      'fetchThread',
      'createThread',
      'fetchLectureContent',
      'createThreadEntry',
    ]),
    ...mapMutations(['setThreadEntries']),
    async seeThread(id) {
      console.log('See Thread called.')
      this.selectedThreadId = id // is used when posting answer, do not refactor
      let i
      for (i = 0; i < this.threads.length; i++) {
        if (this.threads[i].id === this.selectedThreadId) {
          this.selectedThreadIndex = i
        }
      }
      const thread = await this.fetchThread({
        courseId: this.$route.params.courseId,
        threadId: this.threads[this.selectedThreadIndex].id,
      })
      this.showPart = 2
      // this.threads[this.selectedThreadIndex].entries = thread.entries
      this.entries = thread.entries
      this.threadTitle = this.threads[this.selectedThreadIndex].title
    },
    async postAnswer() {
      console.log('Post answer called.')
      await this.createThreadEntry({
        threadId: this.selectedThreadId,
        courseId: this.$route.params.courseId,
        entryText: this.userEnteredAnswer,
      })
      const thread = await this.fetchThread({
        courseId: this.$route.params.courseId,
        threadId: this.threads[this.selectedThreadIndex].id,
      })
      this.entries = thread.entries
      // let entryToInsert = {
      //   content: this.userEnteredAnswer,
      //   poster:
      // }
      // this.threads[this.selectedThreadIndex].entries.splice(
      //   this.threads[this.selectedThreadIndex].entries.length,
      //   0,
      //   entryToInsert,
      // )
      this.userEnteredAnswer = ''
    },
    goToCreateNewThread: function() {
      this.showPart = 3
    },
    async fetchThreads() {
      const courseId = this.$route.params.courseId
      const { data } = await axios.get(`courses/${courseId}/qna`)
      this.threads = data
    },
    async createNewThread() {
      await this.createThread({
        courseId: this.$route.params.courseId,
        postText: this.userEnteredThreadTitle,
      })
      await this.fetchThreads()
      this.userEnteredThreadTitle = ''
      this.showPart = 1
      this.goBackToThreads()
    },
    goBackToThreads: function() {
      this.showPart = 1
    },
  },
  async created() {
    const { data } = await this.fetchThreads()
    this.threads = data
  },
}
</script>

<style></style>
