
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

const actions = {
  // signIn: ({ commit }, payload) => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(`${baseUrl}api/auth/signIn`, payload, config)
  //       .then(({ status, ...result }) => {
  //         // {result: return array currently}
  //         if (status === 200) {
  //           resolve(result);
  //         }
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // },
  async signUp({commit}, payload) {
    let result = await post(`${baseUrl}api/auth/signIn`, payload, config);
  },

  signUp: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}api/auth/signUp`, payload, config)
        .then((resp, ...result) => {
          if (resp.data.status === true) {
            resolve(result);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  signUpConfirm: ({ commit }, payload) => {
    console.log(payload, 555)
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}api/auth/signUp-confirm`, payload, config)
        .then((resp, ...result) => {
          if (resp.data.status === true) {
            resolve(result);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  fPassword: ({ commit }, payload) => {
    return post(
      `${baseUrl}api/auth/forgot-password`,
      payload,
      config
    );
  },
};

export default {
  namespaced: true,
  actions,
};
