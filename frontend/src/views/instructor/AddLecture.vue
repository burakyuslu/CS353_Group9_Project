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
          Add the name of your lecture  
        </template>
      </v-text-field>
    </v-container>
    
    <v-container>
      <v-text-field>
        <template v-slot:label>
          Add the URL of your lecture video here 
        </template>
      </v-text-field>
    </v-container>

    <v-container>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small>
            Add Lecture
        </v-btn>
      </router-link>
    </v-container>

  </v-form>
</template>

<script>
export default {}
</script>

<style></style>
