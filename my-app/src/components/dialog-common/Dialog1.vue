<template>
<v-dialog v-model="dialog1" max-width="900px">
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
            <v-text-field v-model="editedItem.username" label="username" ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.email" label="email"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.password" type="password" label="password"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.full_name" label="full_name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-radio-group label="giới tính :" v-model="editedItem.sex_type" row>
              <v-radio label="Nam" value=1></v-radio>
              <v-radio label="Nữ" value=0></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu ref="birthday" v-model="birthday" :close-on-content-click="false" :return-value.sync="editedItem.birthday" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="editedItem.birthday" label="Ngày sinh nhật" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="editedItem.birthday" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="birthday = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.birthday.save(editedItem.birthday)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.address" label="address"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.phoneNumber" label="phoneNumber"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu ref="start_Date" v-model="start_Date" :close-on-content-click="false" :return-value.sync="editedItem.start_Date" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="editedItem.start_Date" label="Ngày bắt đầu" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="editedItem.start_Date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="start_Date = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.start_Date.save(editedItem.start_Date)">OK</v-btn>
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
  props: {
    // editedItem: Object
  },
  data() {
    return {
      dialog1: false,
      birthday: false,
      start_Date: false,
      editedItem: {
        username: "ec1",
        email: "ec1@gmail.com",
        password: "12345678",
        full_name: "user 1",
        sex_type: "",
        birthday: "",
        address: "Dũng sĩ - Thanh Khê - Đà nẵng",
        phoneNumber: "0865675232",
        start_Date: ""
      },
    }
  },
  methods: {
    ...mapActions("abc", ["newItem"]),
    close() {
      this.dialog1 = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 1000);
    },

    save() {
      this.newItem({
        username: this.editedItem.username,
        email: this.editedItem.email,
        password: this.editedItem.password,
        full_name: this.editedItem.full_name,
        sex_type: !!(Number(this.editedItem.sex_type)),
        birthday: this.editedItem.birthday,
        address: this.editedItem.address,
        phoneNumber: this.editedItem.phoneNumber,
        start_Date: this.editedItem.start_Date
      })
      this.close();
    },

  },
  watch: {
    
  },
}
</script>
