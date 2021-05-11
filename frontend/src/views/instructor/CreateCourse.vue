<template>
  <v-form>
    <v-container >
      <v-card outlined tile>
              <v-card-title>
                Create Your Course (You will have the chance to add lectures and assignments in the main)
              </v-card-title>
      </v-card>
    </v-container>

    <v-container>
      <v-text-field>
        <template v-slot:label>
          Enter The Name Of Your Course 
        </template>
      </v-text-field>
    </v-container>

    <v-container>
      <v-text-field>
        <template v-slot:label>
          Enter Course Category
        </template>
      </v-text-field>
    </v-container>

    <v-container>
      <v-text-field>
        <template v-slot:label>
          Enter The Initial Price For The Course
        </template>
      </v-text-field>
    </v-container>


    <v-container>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small>
            Save Your Course
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
