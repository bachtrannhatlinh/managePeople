<template>
<v-app class="designVapp">
  <div class="desginHome">
    <div class="button">
      <v-btn class="desBtn mx-1 my-1" color="info" >
        <router-link to="/login">Login</router-link>
      </v-btn>
      <v-btn class="desBtn mx-1 my-1" color="green">
        <router-link to="/register">Register</router-link>
      </v-btn>
    </div>
    <v-img src="../assets/two-dog.jpg" aspect-ratio="1.92" ></v-img> 
  </div>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>

<style scoped>
  .designVapp {
    margin-top: 0 !important;
  }
  .desginHome {
    position: relative;
  }

  .button {
    z-index: 2;
    position: absolute;
    display: flex;
    right: 0;
    top: 0;
  }

  .desBtn a {
    color: white !important;
    text-decoration: none;
  }

</style>
