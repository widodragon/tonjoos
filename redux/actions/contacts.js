import axios from "axios";
export const getContact = (token) => {
  return {
    type: 'GET_CONTACT',
    payload: axios.get(`https://devel-7.tonjoostudio.com/recruitment-api/contacts?token=${token}`)
  }
}


