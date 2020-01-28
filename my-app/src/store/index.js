import Vue from 'vue'
import Vuex from 'vuex'
import abc from "./abc"
import internship from "./internship"
import views from "./views"
import cv from "./cv"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    abc,
    internship,
    views,
    cv,
  }
})
