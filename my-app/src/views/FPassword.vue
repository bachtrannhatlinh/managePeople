<template>
<v-app class="designVapp">
  <v-img src="../assets/green-spring.jpeg" aspect-ratio="2"></v-img>
  <div class="editForm">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar color="error" dark flat>
          <v-toolbar-title>Forgot Password </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field label="email" name="email" prepend-icon="email" type="text"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" class="desBtn">
            <router-link to="/login">Login</router-link>
          </v-btn>
          <v-btn color="error" @click="handleFPassword">Forgot Password</v-btn>
          <v-btn color="green" class="desBtn">
            <router-link to="/register">Register</router-link>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</v-app>
</template>

<script>
import {
  mapActions
} from 'vuex';
export default {
  data() {
    return {
      email: ''
    }
  },
  mounted() {},
  methods: {
    ...mapActions("views", ["fPassword"]),
    handleFPassword() {
      this.fPassword({
        email: this.email
      })
    }
  }
}
</script>

<style scoped>
.designVapp {
  position: relative;
  margin-top: 0 !important
}

.editForm {
  width: 100%;
  position: absolute;
  left: 10%;
  top: 5%;
}

.editImage {
  height: 100%;
}

.desBtn a {
  color: white !important;
  text-decoration: none;
}
</style>
