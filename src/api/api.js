import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3001/api',
  headers: {
    Accept: 'application/json'
    // "Authorization" : "Bearer d0b49a2aa6192225dff1a20ec24a3a245d56893433d8fd5a119b10e9be9292b4"
  }
})

export default instance
