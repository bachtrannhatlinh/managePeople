<template>
<v-app class="designVapp">
  <v-img src="../assets/pineapple-fruit.jpg" aspect-ratio="2"></v-img>
  <div class="editForm">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field label="email" v-model="login.email" name="login" prepend-icon="email" type="text"></v-text-field>
            <v-text-field id="password" v-model="login.password" label="Password" name="password" prepend-icon="lock" :append-icon="show1 ? 'visibility' : 'visibility_off'" :type="show1 ? 'text' : 'password'" counter @click:append="show1 = !show1"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="green" class="desBtn">
            <router-link to="/register">Register</router-link>
          </v-btn>
          <v-btn color="primary" @click="handleLog">Login</v-btn>
          <v-btn color="error" class="desBtn">
            <router-link to="/fpassword">Forget Password</router-link>
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
} from "vuex";
export default {
  data: () => ({
    show1: false,
    email: [v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid Email address'],
    // rules: {
    //   required: value => !!value || 'Required.',
    //   min: v => v.length >= 8 || 'Min 8 characters',
    //   emailMatch: () => ('The email and password you entered don\'t match'),
    // },
    // password: [v => /^[A-Za-z]\w{7,14}$/.test(v) || "7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter"],
    password: [v => /^[A-Za-z]\w{7,15}$/.test(v) || "The password must be a number, greater than 8 characters and less than 15 characters"],
    login: {
      email: '',
      password: '',
    },
  }),

  methods: {
    ...mapActions("views", ["signIn"]),
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    handleLog() {
      this.signIn({
          email: this.login.email,
          password: this.login.password
        })
        .then(result => {
          let token = result.data.token
          localStorage.setItem('token', token)
          this.$router.push('/admin/homeAdmin')
        })
        .catch((err) => {
          alert('error')
        });
    }
  },
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

.desBtn a{
  color: white !important;
  text-decoration: none;
}
</style>
