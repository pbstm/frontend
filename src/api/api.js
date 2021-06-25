import { instance } from '../const/const'

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
