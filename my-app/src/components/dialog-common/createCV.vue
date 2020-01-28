<template>
<v-dialog v-model="createCV" max-width="900px">
  <template v-slot:activator="{ on }">
    <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
  </template>
  <v-card>
    <v-card-title>
      <span class="headline">New Item</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="createItemCV.full_name" label="full_name" ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="createItemCV.email" label="email" ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="createItemCV.phoneNumber" label="phoneNumber"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="createItemCV.type_apply" label="type_apply"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="createItemCV.cv_point" label="cv_point"></v-text-field>
          </v-col>
           <v-col cols="12" sm="6" md="4">
            <v-menu ref="time_interview" v-model="time_interview" :close-on-content-click="false" :return-value.sync="createItemCV.time_interview" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="createItemCV.time_interview" label="Thời gian phỏng vấn" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="createItemCV.time_interview" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="time_interview = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.time_interview.save(createItemCV.time_interview)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-radio-group label="giới tính :" v-model="createItemCV.cv_pass_fail" row>
              <v-radio label="Pass" value = true></v-radio>
              <v-radio label="Fail" value = false></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-radio-group label="giới tính :" v-model="createItemCV.interview_pass_fail" row>
              <v-radio label="Pass" value = true></v-radio>
              <v-radio label="Fail" value = false></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-radio-group label="giới tính :" v-model="createItemCV.take_interview" row>
              <v-radio label="Pass" value = true></v-radio>
              <v-radio label="Fail" value = false></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="createItemCV.url_preview_cv" label="url_preview_cv"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="createItemCV.position_apply" label="position_apply"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu ref="createAt" v-model="createAt" :close-on-content-click="false" :return-value.sync="createItemCV.createAt" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="createItemCV.createAt" label="Ngày tạo" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="createItemCV.createAt" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="createAt = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.createAt.save(createItemCV.createAt)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      createCV: false,
      time_interview: false,
      createAt: false,
      createItemCV: {
        full_name: "ec ec 1",
        email : "sieutromkid1325@gmail.com",
        phoneNumber: "0865675232",
        type_apply: "1",
        cv_point: "5",
        time_interview: "",
        cv_pass_fail: "",
        interview_pass_fail: "",
        take_interview: "",
        url_preview_cv:"https://www.youtube.com/watch?v=amKc00_QHew",
        position_apply:"front-end developer",
        createAt: ""
      },
    }
  },
  methods: {
    ...mapActions("cv", ["createAccountCV"]),
    close() {
      this.createCV = false;
      setTimeout(() => {
        this.createItemCV = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 1000);
    },

    save() {
      this.createAccountCV({
        full_name: this.createItemCV.full_name,
        email: this.createItemCV.email,
        phoneNumber: this.createItemCV.phoneNumber,
        type_apply: this.createItemCV.type_apply,
        cv_point: this.createItemCV.cv_point,
        time_interview: this.createItemCV.time_interview,
        cv_pass_fail: this.createItemCV.cv_pass_fail,
        interview_pass_fail: this.createItemCV.interview_pass_fail,
        take_interview: this.createItemCV.take_interview,
        url_preview_cv: this.createItemCV.url_preview_cv,
        position_apply: this.createItemCV.position_apply,
        createAt: this.createItemCV.createAt
      })
      this.close();
    },

  },
  watch: {
    
  },
}
</script>
