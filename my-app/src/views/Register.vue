<template>
<v-app class="designVapp">
  <v-img src="../assets/night-sky.jpeg" aspect-ratio="2"></v-img>
  <div class="editForm ">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar color="green" dark flat>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="person" name="Username" label="Username" v-model="register.username"></v-text-field>
            <v-text-field prepend-icon="email" name="Email" label="Email" v-model="register.email"></v-text-field>
            <v-text-field prepend-icon="lock" name="Password" label="Password" v-model="register.password" :append-icon="show1 ? 'visibility' : 'visibility_off'" :type="show1 ? 'text' : 'password'" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
            <v-text-field prepend-icon="person" name="Full Name" label="Full Name" v-model="register.full_name"></v-text-field>
            <!-- <v-select prepend-icon="work" label="Sex Type" :items="sexTypes" item-text="text" item-value="value" v-model="register.sex_type" :rules="[v => !!v || 'Item is required']"></v-select> -->
            <v-radio-group prepend-icon="person" v-model="register.sex_type" row>
              <v-radio label="Nam" value=1></v-radio>
              <v-radio label="Nữ" value=0></v-radio>
            </v-radio-group>
            <v-text-field prepend-icon="person" name="address" label="address" v-model="register.address"></v-text-field>
            <v-text-field prepend-icon="phone" name="phoneNumber" label="Phone Number" v-model="register.phoneNumber"></v-text-field>
            <div class="editPos">
              <v-col>
                <v-btn color="info" dark class="mx-2 desBtn">
                  <router-link to="/login">Login</router-link>
                </v-btn>
                <v-btn color="green" dark class="mx-2" @click="handleRe">
                  Register
                </v-btn>

                <v-dialog v-model="dialog" persistent max-width="600px">
                  <v-card>
                    <v-alert :color="type" icon="check_circle" v-if="type">
                      Nhập thông tin chính xác
                    </v-alert>
                    <v-card-title>
                      <span class="headline">Nhập mã xác thực !</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-text-field label="VerificationCode*" required v-model="ve.verification_code"></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field label="Email*" required v-model="ve.email_ve"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Close</v-btn>
                      <v-btn color="blue darken-1" text @click="handleVerCode('success')">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-btn color="red" dark class="mx-2 desBtn">
                  <router-link to="/fpassword">Forgot Password</router-link>
                </v-btn>
              </v-col>
            </div>
          </v-form>
        </v-card-text>
        <!-- <v-card-actions class="justify-center">
          <v-btn color="info">Login</v-btn>
          <v-btn color="green">Register</v-btn>
          <v-btn color="error">Forgot Password</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-flex>
  </div>
</v-app>
</template>

<script>
import axios from 'axios'
import {
  mapActions
} from "vuex"
export default {
  data() {
    return {
      show1: false,
      // rules: {
      //   required: value => !!value || 'Required.',
      //   min: v => v.length >= 8 || 'Min 8 characters',
      //   emailMatch: () => ('The email and password you entered don\'t match'),
      // },
      usernameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      type: null,
      dialog: false,
      sexTypes: [{
          text: "Nam",
          value: true
        },
        {
          text: "Nữ",
          value: false
        },
      ],
      register: {
        username: "",
        email: "",
        password: "",
        re_password: "",
        full_name: "",
        sex_type: "",
        address: "",
        phoneNumber: ""
      },
      ve: {
        verification_code: "",
        email_ve: ""
      }
    }
  },
  methods: {
    ...mapActions("views", ["signUp", "signUpConfirm"]),
    close() {
      this.dialog = false;
    },
    handleRe() {
      this.signUp({
          username: this.register.username,
          email: this.register.email,
          password: this.register.password,
          full_name: this.register.full_name,
          sex_type: !!(Number(this.register.sex_type)),
          address: this.register.address,
          phoneNumber: this.register.phoneNumber
        })
        .then((result) => {
          this.dialog = true;
        }).catch((err) => {
          this.dialog = false;
          alert('bạn nhập sai thông tin , mời kiểm tra nhập lại !')
        });
    },
    handleVerCode(type) {
      this.signUpConfirm({
          verificationCode: this.ve.verification_code,
          email: this.ve.email_ve
        })
        .then((result) => {
          this.type = type
          let timer = this.handleVerCode.timer
          if (timer) {
            clearTimeout(timer)
          }
          this.handleVerCode.timer = setTimeout(() => {
            this.type = null
          }, 3000)
          // this.$router.push('/login')
        }).catch((err) => {
          alert('bạn nhập sai thông tin , mời kiểm tra nhập lại !')
          // this.type = type
          // let timer = this.handleVerCode.timer
          // if (timer) {
          //   clearTimeout(timer)
          // }
          // this.handleVerCode.timer = setTimeout(() => {
          //   this.type = null
          // }, 3000)
        });
    },
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
