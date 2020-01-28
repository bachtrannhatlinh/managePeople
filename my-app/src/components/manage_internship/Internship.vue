<template>
<v-app>
  <v-row justify="center" >
    <v-col cols="3">
      <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2"></v-img>
    </v-col>
    <v-col cols="9">
      <v-card>
        <v-card-title>
          what is your name ? {{myInternship.full_name}}
        </v-card-title>
        <v-card-text>
          _id: {{myInternship._id}}
        </v-card-text>
        <v-card-text>
          Địa chỉ : {{myInternship.address}}
        </v-card-text>
        <v-card-text>
          Trường đại học : {{myInternship.university}}
        </v-card-text>
        <v-card-text>
          email : {{myInternship.email}}
        </v-card-text>
        <v-card-text>
          Số điện thoại : {{myInternship.phoneNumber}}
        </v-card-text>
        <v-card-text>
          Vị trí tuyển dụng : {{myInternship.position_apply}}
        </v-card-text>
        <v-card-text>
          Giới tính : {{ styleSex(myInternship.sex_type) }}
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
    ...mapActions('xyz', ['getIdAccountIntern']),
    styleSex
  },
  computed: {
    ...mapGetters('xyz', ['myInternship'])
  },
  mounted() {
    this.getIdAccountIntern(this.$route.params._id)
  }
}
</script>

<style scoped>
.topp {
  margin-top: 60px;
}
</style>
