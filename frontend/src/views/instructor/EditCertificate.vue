<template>
  <v-form>
    <v-container >
      <v-card outlined tile>
              <v-card-title>
                Edit Certificate
              </v-card-title>
      </v-card>
    </v-container>

    <v-container> 
      <v-textarea
        color="teal"
      >
        <template v-slot:label>
          <div>
            Input Your Certificate As Text Here
          </div>
        </template>
      </v-textarea>
    </v-container>

    <v-container> 
      <v-file-input accept=".doc, .txt" label="You can also upload your certificate as text file">
      </v-file-input>
    </v-container>

    <v-container> 
      <v-file-input accept="image.*" label="You can also upload your certificate as an image">
      </v-file-input>
    </v-container>

    <v-container>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small>
            Save Your Certificate
        </v-btn>
      </router-link>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small>
            Cancel
        </v-btn>
      </router-link>
    </v-container>

  </v-form>
</template>

<script>
export default {}
</script>

<style></style>
