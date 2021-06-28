import { instance } from '../const/const'
/* eslint-disable camelcase */

const Api = {
  getProfile() {
    return instance.get(`profile/show`).then((response) => response.data)
  },
  login(email, password, type) {
    return instance
      .post(`/sign_in`, {
        email,
        password,
        type
      })
      .then((response) => response.data)
  },
  register(name, email, password, password_confirmation) {
    return instance
      .post(`/sign_up`, {
        name,
        email,
        password,
        password_confirmation
      })
      .then((response) => response.data)
  }
}

export default Api
