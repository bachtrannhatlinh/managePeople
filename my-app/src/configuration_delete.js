import axios from 'axios'
export default function deleteItem(url, data , option){
  return axios.delete(url, data, option)
}