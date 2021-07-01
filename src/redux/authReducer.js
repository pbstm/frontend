import { stopSubmit } from 'redux-form'
import Api from '../api/api'

const initialState = {
  id: null,
  name: null,
  email: null,
  createdAt: null,
  updatedAt: null,
  avatarUrl: null,
  type: null,
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
    type,
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
      type,
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
            response.user.type,
            true
          )
        )
      }
    })
    .catch(() => {
      dispatch(
        actions.setProfileData(null, null, null, null, null, null, null, false)
      )
    })
}

export const login = (email, password, type) => async (dispatch) => {
  await Api.login(email, password, type)
    .then((response) => {
      localStorage.setItem('token', response.token)
    })
    .then(() => {
      window.location.replace('./cabinet')
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
  (name, email, password, passwordConfirmation) => async (dispatch) => {
    await Api.register(name, email, password, passwordConfirmation)
      .then((response) => {
        if (response.success === true) {
          // eslint-disable-next-line no-console
          console.log(response.user)
        }
      })
      .catch((error) => {
        const formError = error.response.data.errors[0].messages[0]
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
