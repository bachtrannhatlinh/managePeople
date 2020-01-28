<template>
<v-app>
  <v-row justify="center" >
    <v-col cols="3">
      <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2"></v-img>
    </v-col>
    <v-col cols="9">
      <v-card>
        <v-card-title>
          what is your name ? {{myUser.full_name}}
        </v-card-title>
        <v-card-text>
          _id: {{myUser._id}}
        </v-card-text>
        <v-card-text>
          Địa chỉ : {{myUser.address}}
        </v-card-text>
        <v-card-text>
          Ngày sinh : {{myUser.birthday | timeformat}}
        </v-card-text>
        <v-card-text>
          email : {{myUser.email}}
        </v-card-text>
        <v-card-text>
          Số điện thoại : {{myUser.phoneNumber}}
        </v-card-text>
        <v-card-text>
          Vị trí tuyển dụng : {{myUser.position_apply}}
        </v-card-text>
        <v-card-text>
          Giới tính : {{ styleSex(myUser.sex_type) }}
        </v-card-text>
        <v-card-text>
          Tên đăng nhập : {{myUser.username}}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-app>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import styleSex from '../../config_common'
export default {
  data() {
    return {

    }
  },
  methods: {
    ...mapActions('abc', ['getUserById']),
    styleSex
  },
  computed: {
    ...mapGetters('abc', ['myUser'])
  },
  mounted() {
    this.getUserById(this.$route.params._id)
  }
}
</script>

<style scoped>
.topp {
  margin-top: 60px;
}
</style>
