import axios from 'axios'
/* eslint-disable camelcase */

export const getAccessToken = () => {
  const token = localStorage.getItem('token')
  return token
}

export const instance = axios.create({
  baseURL: 'http://localhost:3010/api/v1',
  headers: {
    Accept: 'application/json',
    Authorization: getAccessToken()
  }
})
