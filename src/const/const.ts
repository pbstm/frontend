import axios from 'axios'

require('dotenv').config()

export const getAccessToken = () => localStorage.token

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Accept: 'application/json',
    Authorization: getAccessToken()
  }
})
