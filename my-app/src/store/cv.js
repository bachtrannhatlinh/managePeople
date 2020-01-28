import axios from "axios";
import get from "../configuration_get";
import post from "../configuration_post";
import deleteItem from "../configuration_delete";
import put from "../configuration_put";

const baseUrl = "https://admin-htactive.herokuapp.com/";

var token = localStorage.getItem("token");
var config = {
  headers: {
    Authorization: "Bearer " + token
  }
};

const state = {
  arrCV : []
}

const getters = {
  updateArrCV (state) {
    return state.arrCV
  }
}

const mutations = {
  getAllCV(state, result) {
    state.arrCV = result
  },

  createAccountCV(state, result) {
    state.arrCV.results = [...state.arrCV.results, result];
  },

  editItemCV(state, payload) {
    state.arrCV.results = state.arrCV.results.map(item => {
      if (item._id === payload.userId) {
        return Object.assign({}, item, payload)
      }
      return item
    })
  },
}

const actions = {
  async getAllCV({commit}, payload) {
    console.log(payload, 444)
    const resp = await post (`${baseUrl}api/cv-apply/get`, payload, config);
    commit("getAllCV", resp.data)
  },

  async createAccountCV({commit}, payload) {
    const resp = await post (`${baseUrl}api/cv-apply/create`, payload, config);
    if(resp.data.status === true) {
      commit("createAccountCV", payload)
    }
  },

  async editItemCV({commit}, payload) {
    const resp = await put (`${baseUrl}api/cv-apply/${payload.userId}`, payload, config);
    if(resp.data.status === true){
      commit("editItemCV", payload)
    }
  },

  async deleteItemCV({commit}, userId) {
    const resp = await deleteItem (`${baseUrl}api/${userId}`)

  }
}

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations
};
