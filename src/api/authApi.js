import instance from './api'

const authAPI = {
  getAuth() {
    return instance.get(`auth/getauth`).then((response) => response.data)
  },
  login(email, password, grantType) {
    return instance
      .post(`/token`, {
        email,
        password,
        grantType
      })
      .then((response) => response.data)
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response.data)
  },
  test() {
    return instance.get(`/v2/test`).then((response) => response.data)
  }
}

export default authAPI
