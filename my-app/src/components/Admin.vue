<template>
<v-app id="inspire">
  <v-navigation-drawer v-model="drawer" app dark>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-9/78700000_2442550966072784_2693928553203892224_n.jpg?_nc_cat=108&_nc_eui2=AeFD75y4T-FXgCJo8ZtXvnYsD2-1KZ88jWdgoJAuJusXnEj5bw5NwOeD4J8_1oerINLrs0LWPF9c7TnDmQZkD86kHUESB5GZDt7fDS0JPTXJDA&_nc_ohc=wiJ6Jko-PvcAQk8SP_0FhN0egG6ZN0QqvclQL17aqHmWNmAinML6WbD9g&_nc_ht=scontent.fdad2-1.fna&oh=f26d921bfa738bb5f571a7d2ca04b7f1&oe=5E70C6A2"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>Dế Mèn Phiêu Lưu Ký</v-list-item-title>
      </v-list-item>
      <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="subItem in item.items" :key="subItem.title" @click="" :to="subItem.link">
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app color="brown" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title>
      <router-link to="/admin/accounts" tag="span" style="cursor: pointer">Dế Mèn Phiêu Lưu Ký</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-toolbar-title v-on="on" style="cursor: pointer">
          {{board.full_name}}
        </v-toolbar-title>
      </template>
      <v-list style="cursor: pointer">
        <v-list-item class="hoverItem my-1">
          <v-list-item-title>
            <i class="fas fa-cog"></i>
            Cài đặt tài khoản</v-list-item-title>
        </v-list-item>
        <v-list-item class="hoverItem my-1">
          <v-list-item-title @click="handleLogout">
            <i class="fas fa-outdent"></i>
            Đăng xuất tài khoản</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <v-content class="pd0">
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'App',

  components: {

  },

  data() {
    return {
      drawer: null,
      board: '',
      items: [{
          action: 'person',
          title: 'Quản lý tài khoản',
          items: [{
              title: 'Tài khoản đang hoạt động',
              link: '/admin/accounts',
            },
            {
              title: 'Tài khoản đang bị khóa',
              link: '/admin/account_block'
            },
          ],
        },
        {
          action: 'supervisor_account',
          title: 'Quản lý nhân viên',
          items: [{
              title: 'Nhân viên đang hoạt động',
              link: '/admin/staff_active',
            },
            {
              title: 'Nhân viên đã rời công ty'
            },
          ],
        },
        {
          action: 'sentiment_satisfied_alt',
          title: 'Quản lý thực tập sinh',
          items: [{
              title: 'Thực tập sinh đang hoạt động',
              link: '/admin/internship_active'
            },
            {
              title: 'Thực tập sinh đã rời công ty'
            },
          ],
        },
        {
          action: 'insert_drive_file',
          title: 'Quản lý CV',
          items: [{
              title: 'Thống kê CV',
              link: '/admin/pushCV'
            },
            {
              title: 'Danh sách CV nộp vào công ty'
            },
            {
              title: 'CV Thực tập'
            },
            {
              title: 'CV Nhân viên'
            }
          ],
        },
        {
          action: 'attach_money',
          title: 'Quản lý thu chi',
          items: [{
            title: 'Danh sách tiền thu chi'
          }, ],
        },
        {
          action: 'calendar_today',
          title: 'Quản lý ngày vắng',
          items: [{
              title: 'Thống kê ngày vắng'
            },
            {
              title: 'Danh sách nhân viên vắng'
            },
            {
              title: 'Danh sách thực tập sinh vắng'
            },
          ],
        },
        {
          action: 'money',
          title: 'Quản lý lương nhân viên',
          items: [{
            title: 'Danh sách lương của nhân viên'
          }, ]
        }
      ],
    }
  },
  async mounted() {
    let xxx = await this.getMe()
    this.board = xxx.data.result
  },
  methods: {
    ...mapActions("abc", ["getMe", "signOut"]),
    
    async handleLogout() {
      let yyy = await this.signOut()
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.pd0 {
  padding-top: 0px !important;
}

.contentAdmin {
  margin-top: 60px;
}

.hoverItem :hover{
  background-color: red
}
</style>
