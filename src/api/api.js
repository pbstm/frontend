import axios from 'axios'
/* eslint-disable camelcase */

export const getAccessToken = () => {
  const token = localStorage.getItem('token')
  console.log('from api, token: ', token)
  return token
}

const instance = axios.create({
  baseURL: 'http://localhost:3010/api/v1',
  headers: {
    Accept: 'application/json',
    Authorization: getAccessToken()
  }
})

const Api = {
  getProfile() {
    return instance.get(`profile/show`).then((response) => response.data)
  },
  login(email, password) {
    return instance
      .post(`/sign_in`, {
        email,
        password
      })
      .then((response) => response.data)
  },
  register(name, email, password, password_confirmation, type) {
    return instance
      .post(`/sign_up`, {
        name,
        email,
        password,
        password_confirmation,
        type
      })
      .then((response) => response.data)
  }
}

export default Api
