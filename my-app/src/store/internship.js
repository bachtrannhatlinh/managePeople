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
  accountsInternship: [],
  myInternship: {}
};

const getters = {
  accountsInternship : state => {
    return state.accountsInternship
  },
  myInternship: state => {
    return state.myInternship
  }
};

const mutations = {
  getAllAccountsInternship(state, result) {
    state.accountsInternship = result
    console.log(result, 888)
  },
  
  cancelSearchAccountsInternship(state, result) {
    state.accountsInternship = result;
  },

  createInternship(state, result) {
    state.accountsInternship.results = [...state.accountsInternship.results, result];
  },

  getIdAccountIntern(state, result) {
    state.myInternship = result
  },

  delIdAccountIntern(state, userId) {
    state.accountsInternship.results = state.accountsInternship.results.filter(
      x => x._id !== userId
    )
  },

  editIdAccountIntern(state, payload) {
    state.accountsInternship.results = state.accountsInternship.results.map(item => {
      if (item._id === payload.userId) {
        return Object.assign({}, item, payload)
      }
      return item
    })
  },

  async takeData({ commit }, payload) {
    let resp = await post(`${baseUrl}api/user`, payload, config);
    commit("takeData", resp.data)
  },
};

const actions = {
  async getAllAccountsInternship({ commit }, payload) {
    const result = await post(`${baseUrl}api/interShip/get`, payload, config);
    commit("getAllAccountsInternship", result.data);
  },

  async cancelSearchAccountsInternship({ commit }, payload) {
    const result = await post(`${baseUrl}api/user`, payload, config);
    commit("cancelSearchAccounts", result.data);
  },

  async createInternship({commit}, payload) {
    const resp = await post(`https://admin-htactive.herokuapp.com/api/interShip/create`, payload, config);
    if(resp.data.status === true){
      commit("createInternship", resp.data.result)
    }
  },

  async getIdAccountIntern({commit}, userId ) {
    const resp = await get(`${baseUrl}api/interShip/${userId}`, config);
    if(resp.data.status === true){
      commit("getIdAccountIntern", resp.data.result)
    }
  },

  async delIdAccountIntern({commit}, userId ) {
    const resp = await deleteItem(`${baseUrl}api/interShip/remove/${userId}`, config);
    if(resp.data.status === true){
      commit("delIdAccountIntern", userId)
    }
  },

  async editIdAccountIntern({ commit }, payload) {
    const resp = await put(`${baseUrl}api/user/update-profile/${payload.userId}`, payload, config);
    if (resp.data.status === true) {
      commit("editIdAccountIntern", payload);
    }
  },

};

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations
};