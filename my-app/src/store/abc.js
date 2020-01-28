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
  accounts: {},
  myUser: {}
};

const getters = {
  accounts: state => {
    return state.accounts;
  },
  myUser: state => state.myUser
};

const mutations = {
  getAllAccount(state, result) {
    state.accounts = result;
  },

  cancelSearchAccounts(state, result) {
    state.accounts = result;
  },

  getUserById(state, result) {
    state.myUser = result;
  },

  delItemAccount(state, userId) {
    state.accounts.results = state.accounts.results.filter(
      x => x._id !== userId
    );
  },

  newItem(state, result) {
    state.accounts.results = [...state.accounts.results, result]; // push 1 elemen to array
  },

  editItemAccount(state, payload) {
    state.accounts.results = state.accounts.results.map(item => {
      if (item._id === payload.userId) {
        return Object.assign({}, item, payload);
      }
      return item;
    });
  },

  blockedAccountUser(state, result) {
    state.accounts = {
      ...state.accounts,
      results: state.accounts.results.filter(x => x._id !== result._id)
    };
  },

  takeData(state, result) {
    state.accounts = result
  }
};

const actions = {
  async getMe ({ commit }, payload) {
    return get(`${baseUrl}api/user/get-me`, config);
  },

  async signOut ({ commit }, payload) {
    return get(`${baseUrl}api/user/get-me`, config);
  },

  async getAllAccount({ commit }, payload) {
    let result = await post(`${baseUrl}api/user`, payload, config);
    commit("getAllAccount", result.data);
  },

  async cancelSearchAccounts({ commit }, payload) {
    let result = await post(`${baseUrl}api/user`, payload, config);
    commit("cancelSearchAccounts", result.data);
  },

  async getUserById({ commit }, userId) {
    let response = await get(`${baseUrl}api/user/${userId}`, config);
    commit("getUserById", response.data.result);
  },

  async delItemAccount({ commit }, userId) {
    let resp = await deleteItem(
      `${baseUrl}api/user/remove-account/${userId}`,
      config
    );
    if (resp.data.status === true) {
      commit("delItemAccount", userId);
    }
  },

  async newItem({ commit }, payload) {
    let resp = await post(`${baseUrl}api/user/create-account`, payload, config);
    if (resp.data.status === true) {
      commit("newItem", payload);
    }
  },

  async editItemAccount({ commit }, payload) {
    let resp = await put(
      `${baseUrl}api/user/update-profile/${payload.userId}`,
      payload,
      config
    );
    if (resp.data.status === true) {
      commit("editItemAccount", payload);
    }
  },

  async blockItemAccount({ commit }, { userId, blocked }) {
    let resp = await put(
      `${baseUrl}api/user/block-account/${userId}`,
      { blocked },
      config
    );
    commit("blockedAccountUser", resp.data.result);
  },

  async takeData({ commit }, payload) {
    let resp = await post(`${baseUrl}api/user`, payload, config);
    commit("takeData", resp.data)
  },

  async getDataItemToEdit({commit}, userId) {
    let resp = await get(`${baseUrl}api/user/${userId}`, payload, config);
  }
};

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations
};
