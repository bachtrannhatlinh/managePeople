<template>
<v-app id="app">
  <v-form>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field prepend-icon="person" v-model="username" label="Tên đăng nhập" required></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field prepend-icon="person" v-model="full_name" label="Họ và tên" required></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field prepend-icon="mail" v-model="email" label="Địa chỉ E-mail" required></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field prepend-icon="phone" v-model="phoneNumber" label="Số điện thoại" required></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-menu ref="startDate_dialog" v-model="startDate_dialog" :close-on-content-click="false" :return-value.sync="startDate" transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field v-model="startDate" label="Ngày bắt đầu" prepend-icon="event" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startDate_dialog = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.startDate_dialog.save(startDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="4">
        <v-menu ref="endDate_dialog" v-model="endDate_dialog" :close-on-content-click="false" :return-value.sync="endDate" transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field v-model="endDate" label="Ngày kết thúc" prepend-icon="event" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="endDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endDate_dialog = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.endDate_dialog.save(endDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

    </v-row>
    <v-row justify="center">
      <v-btn large color="info" class="mx-2" @click="handleSearch">Search Account</v-btn>
      <v-btn large color="error" class="mx-2" @click="handleCancel">Cancel Search</v-btn>
    </v-row>
  </v-form>
  <v-data-table :headers="headers" :items="accountsInternship.results" hide-default-footer class="elevation-1 mt-5" style="cursor:pointer">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <Dialog3></Dialog3>
        <Dialog4 :isShowEdit="isShowEdit" :itemDetail="itemDetail" :defaultItem="defaultItem" @clicked="isShowEdit = false">
        </Dialog4>
      </v-toolbar>
    </template>
    <template v-slot:body="{ items }">
      <tbody>
        <tr v-for="item in items" :key="item._id">
          <td class="text-left">
            <router-link :to="`/admin/internships/${item._id}`" class="removeTextDeco">
              {{ item.full_name }}
            </router-link>
          </td>
          <td class="text-left">
            <router-link :to="`/admin/internships/${item._id}`" class="removeTextDeco">
              {{ item.phoneNumber }}
            </router-link>
          </td>
          <td class="text-left">
            <router-link :to="`/admin/internships/${item._id}`" class="removeTextDeco">
              {{ item.startDate | timeformat }}
            </router-link>
          </td>
          <td class="text-left">
            <router-link :to="`/admin/internships/${item._id}`" class="removeTextDeco">
              {{ item.endDate | timeformat }}
            </router-link>
          </td>
          <td class="text-left">
            <router-link :to="`/admin/internships/${item._id}`" class="removeTextDeco">
              {{ styleSex(item.sex_type) }}
            </router-link>
          </td>
          <td class="text-left">
            <router-link :to="`/admin/internships/${item._id}`" class="removeTextDeco">
              {{ item.address }}
            </router-link>
          </td>
          <td class="text-left">
            <v-icon small class="mr-2" @click="itemDetail = item; isShowEdit = true">
              edit
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              delete
            </v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
  <v-pagination v-model="page" :length="accounts.total_page" @input="onPageChange"></v-pagination>
</v-app>
</template>

<script>
import {
  mapGetters,
  mapActions
} from "vuex"
import styleSex from '../../config_common'
import Dialog3 from '../dialog-common/Dialog3'
import Dialog4 from '../dialog-common/Dialog4'
export default {
  data() {
    return {
      page: 1,
      startDate: "",
      endDate: "",
      startDate_dialog: false,
      isShowEdit: false,
      endDate_dialog: false,
      username: "",
      full_name: "",
      email: "",
      phoneNumber: "",
      email: "",
      headers: [{
          text: "Họ và tên",
          value: "username"
        },
        {
          text: "Số điện thoại",
          value: "phoneNumber"
        },
        {
          text: "Ngày bắt đầu",
          value: "startDate"
        },
        {
          text: "Ngày kết thúc",
          value: "endDate"
        },
        {
          text: "Giới tính",
          value: "sex_type"
        },
        {
          text: "Địa chỉ",
          value: "address"
        },
        {
          text: "Hành động",
          value: "action"
        }
      ],
      editedIndex: -1,
      defaultItem: {
        username: "",
        email: "",
        password: "",
        full_name: "",
        sex_type: "",
        address: "",
        university: "",
        phoneNumber: "",
        position_apply: "",
        time_interShip: "",
        startDate: "",
        endDate: ""
      },
      itemDetail: null
    };
  },
  components: {
    Dialog3,
    Dialog4
  },

  mounted() {
    const result = {
      blocked: false,
      sort: {
        startDate: -1,
        endDate: -1,
        full_name: -1,
        phoneNumber: -1,
        email: -1,
        username: -1
      },
      filter: {
        startDate: "",
        endDate: "",
        full_name: "",
        phoneNumber: "",
        email: "",
        username: ""
      },
      pagination: {
        pageSize: 10,
        page: 1
      }
    };
    this.getAllAccountsInternship(result);
  },

  methods: {
    styleSex,
    ...mapActions("internship", ["getAllAccountsInternship", "cancelSearchAccounts", "delIdAccountIntern", "getIdFromUser"]),
    deleteItem(item) {
      this.delIdAccountIntern(item._id)
    },
    handleSearch() {
      const options = {
        blocked: false,
        filter: {
          full_name: null,
          phoneNumber: null,
          email: null,
          username: null,
          startDate: null,
          endDate: null
        },
        sort: {
          startDate: -1
        },
        pagination: {
          pageSize: 10,
          page: 1
        }
      };
      this.getAllAccountsInternship(options);
    },

    handleCancel() {
      const options = {};
      this.cancelSearchAccountsInternship(options);
    },
  },
  computed: {
    ...mapGetters("internship", ["accountsInternship"]),
  }
}
</script>
