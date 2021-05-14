<template>
  <v-container>
    <v-card>
      <v-card-title>Announcements </v-card-title>
      <v-list>
        <v-list-item
          class="listItem"
          v-for="announcement in announcements"
          :key="announcement.ann_date"
          >- {{ announcement.ann_text }}</v-list-item
        >
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'App',
  props: ['announcements'],
}
</script>

<style scoped></style>
