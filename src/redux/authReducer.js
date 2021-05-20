import { stopSubmit } from 'redux-form'
import authAPI from '../api/authApi'

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH_USER_DATA':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export const actions = {
  setAuthUserData: (id, email, login, isAuth) => ({
    type: 'SET_AUTH_USER_DATA',
    payload: {
      id,
      email,
      login,
      isAuth
    }
  })
}

export const getAuthUserData = () => async (dispatch) => {
  const data = await authAPI.getAuth()
  if (data.resultCode === 0) {
    const { id, email, login } = data.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const login = (email, password) => async (dispatch) => {
  const grantType = 'password'
  const loginData = await authAPI.login(email, password, grantType)
  if (loginData.resultCode === 0) {
    localStorage.setItem('token', loginData.jwt)
    dispatch(getAuthUserData())
  } else {
    const message =
      loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
    dispatch(
      stopSubmit('login', {
        _error: message
      })
    )
  }
}

export const register =
  (email, password, passwordConfirm) => async (dispatch) => {
    const registerData = await authAPI.register(
      email,
      password,
      passwordConfirm
    )
    if (registerData.resultCode === 0) {
      localStorage.setItem('token', registerData.jwt)
      dispatch(getAuthUserData())
    } else {
      const message =
        registerData.messages.length > 0 ? registerData.messages[0] : 'Error'
      dispatch(
        stopSubmit('register', {
          _error: message
        })
      )
    }
  }

export const logout = () => async (dispatch) => {
  const logoutData = await authAPI.logout()
  if (logoutData.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export default authReducer
