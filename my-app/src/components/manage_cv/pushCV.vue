<template>
<v-app id="app">
  <v-col cols="12">
    <v-form>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field prepend-icon="person" v-model="position_apply" label="Vị trí ứng tuyển" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select prepend-icon="person" label="cv pass or fail" :items="cv_passORfail" item-text="text" item-value="value" v-model="cv_pass_fail"></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field prepend-icon="person" v-model="full_name" label="Họ và tên" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field prepend-icon="phone" v-model="phoneNumber" label="Số điện thoại" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field prepend-icon="email" v-model="email" label="Địa chỉ E-mail" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field prepend-icon="person" v-model="type_apply" label="kiểu ứng tuyển" required></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn large color="info" class="mx-2" @click="handleSearch">Search Account</v-btn>
        <v-btn large color="error" class="mx-2" @click="handleCancel">Cancel Search</v-btn>
      </v-row>
    </v-form>
    <v-data-table :headers="headers" :items="updateArrCV.results" :items-per-page="itemsPerPage" :page.sync="page"  @page-count="updateArrCV.total_page = $event" hide-default-footer class="elevation-1 mt-5" style="cursor:pointer">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <CreateCV></CreateCV>
          <UpdateCV :isShowEdit="isShowEdit" :itemDetail="itemDetail" @clicked="isShowEdit = false"></UpdateCV>
        </v-toolbar>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item._id">
            <td class="text-left">
              <router-link :to="`/admin/accounts/${item._id}`" class="removeTextDeco">
                {{ item.full_name }}
              </router-link>
            </td>
            <td class="text-left">
              <router-link :to="`/admin/accounts/${item._id}`" class="removeTextDeco">
                {{ item.phoneNumber }}
              </router-link>
            </td>
            <td class="text-left">
              <router-link :to="`/admin/accounts/${item._id}`" class="removeTextDeco ml-5">
                {{ item.cv_point }}
              </router-link>
            </td>
            <td class="text-left">
              <router-link :to="`/admin/accounts/${item._id}`" class="removeTextDeco">
                {{ item.position_apply }}
              </router-link>
            </td>
            <td class="text-left">
              <v-icon small class="mx-2" @click="itemDetail = item; isShowEdit = true">
                edit
              </v-icon>
              <v-icon small class="mx-2" @click="deleteItem(item)">
                delete
              </v-icon>
              <v-icon small class="mx-2" @click="blockItem(item)">
                lock
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <v-pagination v-model="page"  :length="updateArrCV.total_page" @input="next"></v-pagination> 
    <!-- set again state -->
  </v-col>
</v-app>
</template>

<script>
import {
  mapGetters,
  mapActions
} from "vuex"
import styleSex from '../../config_common'
import CreateCV from '../dialog-common/createCV'
import UpdateCV from '../dialog-common/updateCV'
export default {
  data() {
    return {
      page: 1,
      itemsPerPage: 15,
      isShowEdit: false,
      position_apply: "",
      cv_passORfail: [
        {
          text: "pass",
          value: true
        },
        {
          text: "fail",
          value: false
        },
      ],
      cv_pass_fail: "",
      full_name: "",
      phoneNumber: "",
      email: "",
      type_apply: "",
      headers: [{
          text: "Họ và tên",
          value: "username"
        },
        {
          text: "Số điện thoại",
          value: "phoneNumber"
        },
        {
          text: "Điểm phỏng vấn",
          value: "cv_point"
        },
        {
          text: "Vị trí phỏng vấn",
          value: "position_apply"
        },
        {
          text: "Hành động",
          value: "action"
        }
      ],
      editedIndex: -1,
      defaultItem: {
        full_name: "",
        email: "",
        phoneNumber: "",
        type_apply: "",
        cv_point: "",
        time_interview: "",
        cv_pass_fail: "",
        interview_pass_fail: "",
        take_interview: "",
        url_preview_cv: "",
        position_apply: "",
        createAt: ""
      },
      itemDetail: null,
    };
  },
  components: {
    CreateCV,
    UpdateCV
  },

  mounted() {
    const result = {
      sort: {
        full_name: -1
      },
      filter: {
        position_apply: "",
        cv_pass_fail: "",
        full_name: "",
        phoneNumber: "",
        email: "",
        type_apply: "",
      },
      pagination: {
        pageSize: 10,
        page: 1
      }
    }
    this.getAllCV(result)
  },

  methods: {
    ...mapActions("cv", ["getAllCV", "searchSV", "cancelSearchAccounts", "deleteItemCV", "getIdFromUser", "blockItemAccount"]),
    styleSex,

    next(){

    },

    editItem(item) {},

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") && this.deleteItemCV(item._id);
    },

    handleSearch() {
      const options = {
        sort: {
          full_name: -1
        },
        filter: {
          position_apply: this.position_apply || null,
          cv_pass_fail: this.cv_pass_fail,
          full_name: this.full_name || null,
          phoneNumber: this.phoneNumber || null,
          email: this.email || null,
          type_apply: this.type_apply || null
        },
        pagination: {
          pageSize: 10,
          page: 1
        }
      }
      this.getAllCV(options);
    },

    handleCancel() {
      const options = {};
      this.getAllCV(options);
    },
  },

  computed: {
    ...mapGetters("cv", ["updateArrCV"]),
  },

  watch: {
    
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

.removeTextDeco {
  text-decoration: none;
  color: black !important;
}
</style>
