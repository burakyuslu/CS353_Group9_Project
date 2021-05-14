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
      <v-card
        v-for="entry in threads[selectedThreadIndex].entries"
        :key="entry.content"
        outlined
      >
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
import { mapActions } from 'vuex'
export default {
  components: {},
  props: ['threads', 'courseId'],
  created() {
    console.log(this.threads)
  },
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
      // threads: [
      //   {
      //     id: '2',
      //     title: 'How to write better SQL?',
      //     creator: 'Student User 1',
      //     entries: [
      //       {
      //         content: 'Prompt by student user 1, same as the thread title.',
      //         poster: 'Student User 1',
      //       },
      //       {
      //         content: 'Advice by student user 3.',
      //         poster: 'Student User 3',
      //       },
      //       {
      //         content: 'Advice by student user 4.',
      //         poster: 'Student User 4',
      //       },
      //     ],
      //   },
      //   {
      //     id: '1',
      //     title:
      //       'Question about triggers, it will be the same as first entry in final implementation.',
      //     creator: 'Student User 2',
      //     entries: [
      //       {
      //         content: 'Prompt by student user 2, , same as the thread title.',
      //         poster: 'Student User 2',
      //       },
      //       {
      //         content: 'Advice by student user 6.',
      //         poster: 'Student User 5',
      //       },
      //       {
      //         content: 'Advice by student user 5.',
      //         poster: 'Student User 6',
      //       },
      //     ],
      //   },
      // ],
    }
  },
  computed: {},
  methods: {
    ...mapActions(['fetchThread']),
    async seeThread(id) {
      console.log('See Thread called.')
      this.showPart = 2
      this.selectedThreadId = id // is used when posting answer, do not refactor
      let i
      for (i = 0; i < this.threads.length; i++) {
        if (this.threads[i].id === this.selectedThreadId) {
          this.selectedThreadIndex = i
        }
      }
      const thread = await this.fetchThread({
        courseId: this.courseId,
        threadId: this.threads[this.selectedThreadIndex].id,
      })
      this.threads[this.selectedThreadIndex].entries = thread.entries
      this.threadTitle = this.threads[this.selectedThreadIndex].title
    },
    postAnswer: function() {
      console.log('Post answer called.')
      let entryToInsert = {
        content: this.userEnteredAnswer,
        poster: 'I DONT KNOW HOW TO RECORD THE USER WHO DID THIS', // todo
      }
      this.threads[this.selectedThreadIndex].entries.splice(
        this.threads[this.selectedThreadIndex].entries.length,
        0,
        entryToInsert,
      )
    },
    goToCreateNewThread: function() {
      this.showPart = 3
    },
    createNewThread: function() {
      let entryToAdd = {
        id: this.threads[0].id + 1,
        title: this.userEnteredThreadTitle,
        creator: 'I DONT KNOW HOW TO RECORD THE USER WHO DID THIS', // todo
        entries: [
          {
            content: this.userEnteredThreadTitle,
            poster: 'I DONT KNOW HOW TO RECORD THE USER WHO DID THIS', // todo
          },
        ],
      }
      this.threads.splice(0, 0, entryToAdd)
      console.log('Create new thread called.')
      // go back to threads list after creating
      this.showPart = 1
      this.goBackToThreads()
    },
    goBackToThreads: function() {
      this.showPart = 1
    },
  },
}
</script>

<style></style>
