import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import moment from 'moment'

import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

Vue.filter('timeformat', (date) => {
    return moment(date).format('MMMM Do YYYY');
  }
)


new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'fa',
  },
  render: h => h(App)
}).$mount('#app')

