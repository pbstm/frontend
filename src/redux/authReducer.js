import { stopSubmit } from 'redux-form'
import Api from '../api/api'

const initialState = {
  id: null,
  name: null,
  email: null,
  createdAt: null,
  updatedAt: null,
  avatarUrl: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILE_DATA':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export const actions = {
  setProfileData: (
    id,
    name,
    email,
    createdAt,
    updatedAt,
    avatarUrl,
    isAuth
  ) => ({
    type: 'SET_PROFILE_DATA',
    payload: {
      id,
      name,
      email,
      createdAt,
      updatedAt,
      avatarUrl,
      isAuth
    }
  })
}

export const getProfileData = () => async (dispatch) => {
  await Api.getProfile()
    .then((response) => {
      if (response.success === true) {
        dispatch(
          actions.setProfileData(
            response.user.id,
            response.user.name,
            response.user.email,
            response.user.createdAt,
            response.user.updatedAt,
            response.user.avatarUrl,
            true
          )
        )
        console.log('get profile thunk ok: ', response)
      }
    })
    .catch((error) => {
      dispatch(actions.setProfileData(null, null, null, null, null, null, false))
      console.log('get profile thunk error', error)
    })
}

export const login = (email, password) => async (dispatch) => {
  await Api.login(email, password)
    .then((response) => {
      localStorage.setItem('token', response.token)
      console.log('login thunk: ', response)
    })
    .then(() => {
      dispatch(getProfileData())
      console.log('login thunk: getdata')
    })
    .catch((error) => {
      const formError = error.response.data.errors[0].messages[0]
      dispatch(
        stopSubmit('login', {
          _error: formError
        })
      )
    })
}

export const register =
  (name, email, password, passwordConfirmation, type) => async (dispatch) => {
    await Api.register(name, email, password, passwordConfirmation, type)
      .then((response) => {
        if (response.success === true) {
          dispatch(
            actions.setProfileData(
              response.user.id,
              response.user.name,
              response.user.email,
              response.user.createdAt,
              response.user.updatedAt,
              response.user.avatarUrl,
              true
            )
          )
          console.log('register thunk ok: ', response)
        }
      })
      .catch((error) => {
        const formError = error.response.data.errors[0].messages[0]
        console.log('register error ', error.response)
        dispatch(
          stopSubmit('register', {
            _error: formError
          })
        )
      })
  }

export const logout = () => async (dispatch) => {
  localStorage.removeItem('token')
  dispatch(actions.setProfileData(null, null, null, null, null, null, false))
}

export default authReducer
