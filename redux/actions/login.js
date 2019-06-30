import axios from "axios";
export const getLogin = (body) => {
  return {
    type: 'GET_LOGIN',
    payload: axios.post(`https://devel-7.tonjoostudio.com/recruitment-api/authenticate`,body)
  }
}