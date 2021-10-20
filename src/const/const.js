import axios from 'axios'

export const getAccessToken = () => localStorage.token

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    Accept: 'application/json',
    Authorization: getAccessToken()
  }
})
