<template>
    <v-card
      max-width="475"
      class="mx-auto"
    >

      <v-list
        subheader
        two-line
        flat
      >
        <v-subheader>Lectures In Your Course</v-subheader>
  
        <v-list-item-group
          v-model="settings"
          multiple
        >
          <v-list-item>
            <template v-slot:default="{ active, }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>Lecture 1</v-list-item-title>
                <v-list-item-subtitle>Subject of Lecture 1</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
  
          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>Lecture 2</v-list-item-title>
                <v-list-item-subtitle>Subject of Lecture 2</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
  
          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>Lecture 3</v-list-item-title>
                <v-list-item-subtitle>Subject of Lecture 3</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
  
          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>Lecture 4</v-list-item-title>
                <v-list-item-subtitle>Subject of Lecture 4</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>Lecture 5</v-list-item-title>
                <v-list-item-subtitle>Subject of Lecture 5</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>Lecture 6</v-list-item-title>
                <v-list-item-subtitle>Subject of Lecture 6</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>Lecture 7</v-list-item-title>
                <v-list-item-subtitle>Subject of Lecture 7</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>Lecture 8</v-list-item-title>
                <v-list-item-subtitle>Subject of Lecture 8</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>Lecture 9</v-list-item-title>
                <v-list-item-subtitle>Subject of Lecture 9</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
  
              <v-list-item-content>
                <v-list-item-title>Lecture 10</v-list-item-title>
                <v-list-item-subtitle>Subject of Lecture 10</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
</template>

<script>
  export default {
    data: () => ({
      settings: [],
    }),
  }
</script>
