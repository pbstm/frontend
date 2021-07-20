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
  },
  updateName(name) {
    return instance
      .put(`/profile/update`, {
        name
      })
      .then((response) => response.data)
  },
  updateEmail(
    email,
    current_password
  ) {
    return instance
      .put(`/profile/update`, {
        email,
        current_password
      })
      .then((response) => response.data)
  },
  updatePassword(
    current_password,
    password,
    password_confirmation
  ) {
    return instance
      .put(`/profile/update`, {
        current_password,
        password,
        password_confirmation
      })
      .then((response) => response.data)
  },
  updatePhoto(avatar) {
    const formData = new FormData()
    formData.append('avatar', avatar)

    return instance
      .put(`/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => response.data)
  }
}

export default Api
