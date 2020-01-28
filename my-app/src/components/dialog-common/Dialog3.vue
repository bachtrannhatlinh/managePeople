<template>
<v-dialog v-model="dialog3" max-width="900px">
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
            <v-text-field v-model="editedItem.address" label="address"></v-text-field>
          </v-col>
           <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.university" label="university"></v-text-field>
          </v-col>
           <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.phoneNumber" label="phoneNumber"></v-text-field>
          </v-col>
           <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.position_apply" label="position apply"></v-text-field>
          </v-col>
           <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.time_interShip" label="time interShip"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu ref="startDate" v-model="startDate" :close-on-content-click="false" :return-value.sync="editedItem.startDate" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="editedItem.startDate" label="Ngày bắt đầu" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="editedItem.startDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="startDate = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.startDate.save(editedItem.startDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-menu ref="endDate" v-model="endDate" :close-on-content-click="false" :return-value.sync="editedItem.endDate" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="editedItem.endDate" label="Ngày kết thúc" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="editedItem.endDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="endDate = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.endDate.save(editedItem.endDate)">OK</v-btn>
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
      dialog3: false,
      birthday: false,
      startDate: false,
      endDate: false,
      editedItem: {
        username: "linh10",
        email: "nhatlinh10@gmail.com",
        password: "12345678",
        full_name: "nhatlinh3",
        sex_type: "",
        address: "Dũng sĩ - Thanh Khê - Đà nẵng",
        university: " Duy Tan University",
        phoneNumber: "0865675232",
        position_apply: "vue",
        time_interShip: "3",
        startDate: "",
        endDate: ""
      },
    }
  },
  methods: {
    ...mapActions("internship", ["createInternship"]),
    close() {
      this.dialog3 = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 1000);
    },

    save() {
      this.createInternship({
        username: this.editedItem.username,
        email: this.editedItem.email,
        password: this.editedItem.password,
        full_name: this.editedItem.full_name,
        sex_type: !!(Number(this.editedItem.sex_type)),
        address: this.editedItem.address,
        university: this.editedItem.university,
        phoneNumber: this.editedItem.phoneNumber,
        position_apply: this.editedItem.position_apply,
        time_interShip: this.editedItem.time_interShip,
        startDate: this.editedItem.startDate,
        endDate: this.editedItem.endDate
      })
      this.close();
    },

  },
  watch: {
    
  },
}
</script>
