<template>
  <v-form>
    <v-container >
      <v-card outlined tile>
              <v-card-title>
                Add Your Lecture Material Here
              </v-card-title>
      </v-card>
    </v-container>

    <v-container>
      <v-text-field>
        <template v-slot:label>
          Add the URL of your lecture video here 
        </template>
      </v-text-field>
    </v-container>

    <v-container> 
      <v-file-input accept="video/*" label="Upload your lecture video here">
      </v-file-input>
    </v-container>

    <v-container> 
      <v-file-input accept=".doc, .txt" label="Upload your lecture text here">
      </v-file-input>
    </v-container>

  </v-form>
</template>

<script>
export default {}
</script>

<style></style>
