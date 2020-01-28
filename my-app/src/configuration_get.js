import axios from 'axios'
export default function get(url, option) {
  return axios.get(url, option)
}
