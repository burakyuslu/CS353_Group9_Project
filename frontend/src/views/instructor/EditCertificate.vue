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
        v-model="certificate"
      >
        <template v-slot:label>
          <div>
            Input Your Certificate As Text Here
          </div>
        </template>
      </v-textarea>
    </v-container>

    <v-container>
      <router-link to="/instructor/home/">
        <v-btn class="ml-2 mt-5" outlined rounded small @click="submit">
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
export default {
  methods: {
    submit() {
      axios.post('', {data:this.certificate}) // fill the link
      this.$router.go(-1)
    }
  },
  data(){
    return {
      certificate: ''
    }
  }
}
</script>

<style></style>
