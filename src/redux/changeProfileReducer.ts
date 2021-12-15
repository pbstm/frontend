import { Dispatch } from 'redux'
import Api from '../api/api'
// @ts-ignore
import { getProfileData } from './authReducer.ts'
// @ts-ignore
import { BaseThunkType, InferActionsTypes } from "./redux-store.ts";

/* eslint-disable camelcase */
export type InitialStateType = {
  changePasswordError: string,
  changePasswordSuccess: string,
  changeEmailError: string,
  changeEmailSuccess: string
}

const initialState: InitialStateType = {
  changePasswordError: '',
  changePasswordSuccess: '',
  changeEmailError: '',
  changeEmailSuccess: ''
}

export const actions = {
  setChangePasswordError: (changePasswordError: string) => ({
    type: 'SET_CHANGE_PASSWORD_ERROR',
    changePasswordError
  }),
  setChangePasswordSuccess: (changePasswordSuccess: string) => ({
    type: 'SET_CHANGE_PASSWORD_SUCCESS',
    changePasswordSuccess
  }),
  setChangeEmailError: (changeEmailError: string) => ({
    type: 'SET_CHANGE_EMAIL_ERROR',
    changeEmailError
  }),
  setChangeEmailSuccess: (changeEmailSuccess: string) => ({
    type: 'SET_CHANGE_EMAIL_SUCCESS',
    changeEmailSuccess
  })
}

type ActionsTypes = InferActionsTypes<typeof actions>;

const changeProfileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ThunkType = BaseThunkType<ActionsTypes>;
type DispatchType = Dispatch<ActionsTypes>

export const updateNameData = (
  name: string
): ThunkType => async (dispatch: DispatchType) => {
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

export const updateEmailData = (
  email: string,
  current_password: string
): ThunkType => async (dispatch: DispatchType) => {
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
    current_password: string,
    password: string,
    password_confirmation: string
  ): ThunkType => async (dispatch: DispatchType) => {
    await Api.updatePassword(current_password, password, password_confirmation)
      .then((response) => {
        if (response.success === true) {
          dispatch(actions.setChangePasswordError(''))
          dispatch(actions.setChangePasswordSuccess('Password changed successful'))
        }
      })
      .catch((error) => {
        const formError = error.response.data.errors[0].messages[0]
        dispatch(actions.setChangePasswordError(formError))
        dispatch(actions.setChangePasswordSuccess(''))
      })
  }

export const updatePhotoData = (
  avatar: string
): ThunkType => async (dispatch: DispatchType) => {
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
