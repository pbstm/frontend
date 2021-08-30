import Api from '../api/api'

/* eslint-disable camelcase */
const initialState = {
  id: null,
  name: null,
  email: null,
  createdAt: null,
  updatedAt: null,
  avatarUrl: null,
  type: null,
  isAuth: false,
  loginError: '',
  registerError: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILE_DATA':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_LOGIN_ERROR':
      return {
        ...state,
        loginError: action.loginError
      }
    case 'SET_REGISTER_ERROR':
      return {
        ...state,
        registerError: action.registerError
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
  }),
  setLoginError: (loginError) => ({
    type: 'SET_LOGIN_ERROR',
    loginError
  }),
  setRegisterError: (registerError) => ({
    type: 'SET_REGISTER_ERROR',
    registerError
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
            response.user.created_at,
            response.user.updated_at,
            response.user.avatar_url,
            response.user.type,
            true
          )
        )
      }
    })
    .catch(() => {
      dispatch(
        actions.setProfileData(null, null, null, null, null, null, null, false),
        localStorage.removeItem('token'),
        window.location.replace('./login')
      )
    })
}

export const login = (email, password, type) => async (dispatch) => {
  await Api.login(email, password, type)
    .then((response) => {
      localStorage.setItem('token', response.token)
      dispatch(actions.setLoginError(''))
    })
    .then(() => {
      window.location.replace('./cabinet')
    })
    .catch((error) => {
      const formError = error.response.data.errors[0].messages[0]
      dispatch(actions.setLoginError(formError))
    })
}

export const register =
  (name, email, password, passwordConfirmation) => async (dispatch) => {
    await Api.register(name, email, password, passwordConfirmation)
      .then((response) => {
        if (response.success === true) {
          dispatch(actions.setRegisterError(''))
          // eslint-disable-next-line no-console
          console.log(response.user)
          window.location.replace('./login')
        }
      })
      .catch((error) => {
        const formError = error.response.data.errors[0].messages[0]
        dispatch(actions.setRegisterError(formError))
      })
  }

export const logout = () => async (dispatch) => {
  localStorage.removeItem('token')
  dispatch(actions.setProfileData(null, null, null, null, null, null, false))
  window.location.replace('./login')
}

export default authReducer
