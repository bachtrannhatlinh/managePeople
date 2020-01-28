import axios from 'axios'
export default function post(url, data , option){
  return axios.post(url, data, option)
}