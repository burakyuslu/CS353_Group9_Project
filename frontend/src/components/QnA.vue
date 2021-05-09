<template>
  <div>
    <section v-if="showPart == 1">
      <h3>
        Q&A For {{ courseTitle }}
      </h3>
      <v-card v-for="thread in threads" :key="thread.id" outlined>
        <v-list-item-title class="headline mb-1">
          {{ thread.title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          by {{ thread.creator }}
        </v-list-item-subtitle>
        <v-card-actions>
          <v-btn
              outlined
              text
              v-on:click="seeThread"
          >
            See Thread
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-btn
          outlined
          text
          v-on:click="goToCreateNewThread"
      >
        Create New Thread
      </v-btn>
    </section>
    <section v-else-if="showPart == 2">
      <h3> Viewing Thread: {{ threadTitle }}</h3>
      <v-card v-for="entry in threads[selectedThreadId].entries" :key="entry.content" outlined>
        <v-list-item-title class="headline mb-1">
          {{ entry.poster }} Says:
        </v-list-item-title>
        <v-list-item-subtitle>
          by {{ entry.content }}
        </v-list-item-subtitle>
      </v-card>
      <v-card>
        <textarea
            v-model="userEnteredAnswer" placeholder="Post an answer">
        </textarea>
        <v-btn
            outlined
            text
            v-on:click="postAnswer"
        >
          Post Answer
        </v-btn>
      </v-card>

    </section>
    <section v-else>
      <h3> Create A New Thread {{ threadTitle }}</h3>
      <p> Enter your thread's title: </p>
      <input v-model="userEnteredThreadTitle" placeholder="Title"> <input>
      <p> Give a detailed description of your question: </p>
      <textarea v-model="message" placeholder="add multiple lines"></textarea>
      <v-btn
          outlined
          text
          v-on:click="createThread"
      >
        Create New Thread
      </v-btn>
    </section>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // shownPart=1 -> show threads, shownPart=2 -> show selected Thread, shownPart=3-> show create a new thread screen
      showPart: 1,
      selectedThreadId: 1,
      courseTitle: "Databases",
      threadTitle: "no thread selected",
      userEnteredThreadTitle: "",
      userEnteredAnswer: "",
      threads: [
        {
          id: '1',
          title: 'How to write better SQL?',
          creator: 'Student User 1',
          entries: [
            {
              content: "Prompt by student user 1.",
              poster: "Student User 1"
            },
            {
              content: "Advice by student user 3.",
              poster: "Student User 3"
            },
            {
              content: "Advice by student user 4.",
              poster: "Student User 4"
            }
          ],
        },
        {
          id: '2',
          title: 'Question about triggers',
          creator: 'Student User 2',
          entries: [
            {
              content: "Prompt by student user 2.",
              poster: "Student User 2"
            },
            {
              content: "Advice by student user 6.",
              poster: "Student User 5"
            },
            {
              content: "Advice by student user 5.",
              poster: "Student User 6"
            }
          ],
        },
      ],
    };
  },
  computed: {},
  methods: {
    seeThread: function () {
      console.log("See Thread called.")
      this.showPart = 2;
      this.selectedThreadId = 1;
    },
    postAnswer: function () {
      console.log("Post answer called.");
    },
    goToCreateNewThread: function(){
      this.showPart = 3
    },
    createNewThread: function() {
      console.log( "Create thread called.");
      // go back to threads list after creating
      this.showPart = 1;
    }
  }
}
</script>

<style>

</style>