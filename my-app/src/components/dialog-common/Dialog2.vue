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
            <v-text-field v-model="hello.full_name" label="Họ và tên"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="hello.phoneNumber" label="phoneNumber"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu ref="startDate" v-model="startDate" :close-on-content-click="false" :return-value.sync="hello.startDate" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="hello.startDate" label="Ngày bắt đầu" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="hello.startDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="startDate = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.startDate.save(hello.startDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-menu ref="endDate" v-model="endDate" :close-on-content-click="false" :return-value.sync="hello.endDate" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="hello.endDate" label="Ngày kết thúc" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="hello.endDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="endDate = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.endDate.save(hello.endDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-radio-group label="giới tính :" v-model="hello.sex_type" row>
              <v-radio label="Nam" value=1></v-radio>
              <v-radio label="Nữ" value=0></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="hello.address" label="address"></v-text-field>
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
    itemDetail: Object
  },
  
  data() {
    return {
      startDate: false,
      endDate: false,
      hello: {
        full_name: "",
        phoneNumber: "",
        startDate: "",
        endDate: "",
        sex_type: "",
        address: "",
      },
    }
  },

  methods: {
    ...mapActions("abc", ["editItemAccount", ]),
    close() {
      this.$emit('clicked', false);
    },

    save(item) {
      this.editItemAccount({
        full_name: this.hello.full_name,
        phoneNumber: this.hello.phoneNumber,
        startDate: this.hello.startDate,
        endDate: this.hello.endDate,
        sex_type: !!(Number(this.hello.sex_type)),
        address: this.hello.address,
        userId: this.itemDetail._id
      })
      this.close();
    },
  },

  watch: {
    isShowEdit: {
      handler(val) {
        if (val) {
          this.hello = {...this.itemDetail}
        }
      },
      deep: true
    }
  }
}
</script>
