import axios from 'axios'
export default function put(url, data , option){
  return axios.put(url, data, option)
}