import Api from '../api/api'
import { getProfileData } from './authReducer'

/* eslint-disable camelcase */
const initialState = {
  changePasswordError: '',
  changePasswordSuccess: '',
  changeEmailError: '',
  changeEmailSuccess: ''
}

const changeProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHANGE_PASSWORD_ERROR':
      return {
        ...state,
        changePasswordError: action.changePasswordError
      }
    case 'SET_CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        changePasswordSuccess: action.changePasswordSuccess
      }
    case 'SET_CHANGE_EMAIL_ERROR':
      return {
        ...state,
        changeEmailError: action.changeEmailError
      }
    case 'SET_CHANGE_EMAIL_SUCCESS':
      return {
        ...state,
        changeEmailSuccess: action.changeEmailSuccess
      }
    default:
      return state
  }
}

export const actions = {
  setChangePasswordError: (changePasswordError) => ({
    type: 'SET_CHANGE_PASSWORD_ERROR',
    changePasswordError
  }),
  setChangePasswordSuccess: (changePasswordSuccess) => ({
    type: 'SET_CHANGE_PASSWORD_SUCCESS',
    changePasswordSuccess
  }),
  setChangeEmailError: (changeEmailError) => ({
    type: 'SET_CHANGE_EMAIL_ERROR',
    changeEmailError
  }),
  setChangeEmailSuccess: (changeEmailSuccess) => ({
    type: 'SET_CHANGE_EMAIL_SUCCESS',
    changeEmailSuccess
  })
}

export const updateNameData = (name) => async (dispatch) => {
  await Api.updateName(name)
    .then((response) => {
      if (response.success === true) {
        dispatch(getProfileData())
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error.response.data)
    })
}

export const updateEmailData =
  (email, current_password) => async (dispatch) => {
    await Api.updateEmail(email, current_password)
      .then((response) => {
        if (response.success === true) {
          dispatch(getProfileData())
          dispatch(actions.setChangeEmailError(''))
          dispatch(actions.setChangeEmailSuccess('Email changed successful'))
        }
      })
      .catch((error) => {
        const formError = error.response.data.errors[0].messages[0]
        dispatch(actions.setChangeEmailError(formError))
        dispatch(actions.setChangeEmailSuccess(''))
      })
  }

export const updatePasswordData =
  (
    current_password,
    password,
    password_confirmation,
    setSubmitting,
    resetForm
  ) => async (dispatch) => {
    await Api.updatePassword(current_password, password, password_confirmation)
      .then((response) => {
        if (response.success === true) {
          dispatch(actions.setChangePasswordError(''))
          dispatch(actions.setChangePasswordSuccess('Password changed successful'))
          resetForm()
        }
      })
      .catch((error) => {
        const formError = error.response.data.errors[0].messages[0]
        dispatch(actions.setChangePasswordError(formError))
        dispatch(actions.setChangePasswordSuccess(''))
        setSubmitting(false)
      })
  }

export const updatePhotoData = (avatar) => async (dispatch) => {
  await Api.updatePhoto(avatar)
    .then((response) => {
      if (response.success === true) {
        dispatch(getProfileData())
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error.response.data)
    })
}

export default changeProfileReducer
