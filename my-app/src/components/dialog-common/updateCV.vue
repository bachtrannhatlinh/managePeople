<template>
<v-dialog max-width="900px" :value="isShowEdit" >
  <v-card>
    <v-card-title>
      <span class="headline">Edit Item</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="updateItem.full_name" label="Họ và tên"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="updateItem.phoneNumber" label="phoneNumber"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="updateItem.type_apply" label="type_apply"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="updateItem.cv_point" label="cv_point"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu ref="time_interview" v-model="time_interview" :close-on-content-click="false" :return-value.sync="updateItem.time_interview" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="updateItem.time_interview" label="Ngày bắt đầu" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="updateItem.time_interview" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="time_interview = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.time_interview.save(updateItem.time_interview)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-radio-group label="cv pass or fail:" v-model="updateItem.cv_pass_fail" row>
              <v-radio label="Pass" value = true></v-radio>
              <v-radio label="Fail" value = false></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-radio-group label="nguoi phong van pass or fail :" v-model="updateItem.interview_pass_fail" row>
              <v-radio label="Pass" value = true></v-radio>
              <v-radio label="Fail" value = false></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-radio-group label="nguoi phong van pass or fail :" v-model="updateItem.take_interview" row>
              <v-radio label="Pass" value = true></v-radio>
              <v-radio label="Fail" value = false></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="updateItem.url_preview_cv" label="url_preview_cv"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="updateItem.position_apply" label="position_apply"></v-text-field>
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
import {
  mapActions , mapGetters
} from 'vuex'
export default {
  props: {
    isShowEdit: Boolean,
    itemDetail: Object,
  },
  data() {
    return {
      time_interview: false,
      updateItem: {
        full_name: "one two three",
        phoneNumber: "132547896",
        type_apply:"7",
        cv_point:"6",
        time_interview: "",
        cv_pass_fail:"",
        interview_pass_fail:"",
        take_interview:"",
        url_preview_cv:"https://www.youtube.com/watch?v=dXM3JT5ANBI",
        position_apply: "full-stack",
      },
    }
  },
  methods: {
    ...mapActions("cv", ["editItemCV"]),
    close() {
      this.$emit('clicked', false);
      setTimeout(() => {
        this.updateItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 1000);
    },

    save(item) {
      this.editItemCV({
        full_name: this.updateItem.full_name,
        phoneNumber: this.updateItem.phoneNumber,
        type_apply: this.updateItem.type_apply,
        cv_point: this.updateItem.cv_point,
        time_interview: this.updateItem.time_interview,
        cv_pass_fail: this.updateItem.cv_pass_fail,
        interview_pass_fail: this.updateItem.interview_pass_fail,
        take_interview: this.updateItem.take_interview,
        url_preview_cv: this.updateItem.url_preview_cv,
        position_apply: this.updateItem.position_apply,
        userId: this.itemDetail._id
      })
      this.close();
    },
  },
}
</script>
