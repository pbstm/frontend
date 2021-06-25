import { stopSubmit } from 'redux-form'
import Api from '../api/api'

const initialState = {
  id: null,
  name: null,
  email: null,
  createdAt: null,
  updatedAt: null,
  avatarUrl: null,
  isAuth: false,
  isLoggedIn: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILE_DATA':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_IS_LOGGED_IN':
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
    isAuth,
    isLoggedIn
  ) => ({
    type: 'SET_PROFILE_DATA',
    payload: {
      id,
      name,
      email,
      createdAt,
      updatedAt,
      avatarUrl,
      isAuth,
      isLoggedIn
    }
  }),
  setIsLoggedIn: (isLoggedIn) => ({
    type: 'SET_IS_LOGGED_IN',
    payload: {
      isLoggedIn
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
            true,
            true
          )
        )
      }
    })
    .catch(() => {
      dispatch(
        actions.setProfileData(null, null, null, null, null, null, false, true)
      )
    })
}

export const login = (email, password) => async (dispatch) => {
  await Api.login(email, password)
    .then((response) => {
      localStorage.setItem('token', response.token)
      dispatch(actions.setIsLoggedIn(true))
    })
    .then(() => {
      dispatch(getProfileData())
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
  dispatch(
    actions.setProfileData(null, null, null, null, null, null, false, false)
  )
}

export default authReducer
