import { Dispatch } from 'redux'
import request, { AxiosError } from 'axios';
// @ts-ignore
import Api, { ErrorType } from '../api/api.ts'
// @ts-ignore
import { BaseThunkType, InferActionsTypes } from "./redux-store.ts";

/* eslint-disable camelcase */
export type InitialStateType = {
  id: number | null,
  name: string | null,
  email: string | null,
  createdAt: number | null,
  updatedAt: number | null,
  avatarUrl: string | null,
  type: string | null,
  isAuth: boolean,
  loginError: string,
  registerError: string
}

const initialState: InitialStateType = {
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

export const actions = {
  setProfileData: (
    id: number | null,
    name: string | null,
    email: string | null,
    createdAt: number | null,
    updatedAt: number | null,
    avatarUrl: string | null,
    type: string | null,
    isAuth: boolean
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
  setLoginError: (loginError: string) => ({
    type: 'SET_LOGIN_ERROR',
    loginError
  }),
  setRegisterError: (registerError: string) => ({
    type: 'SET_REGISTER_ERROR',
    registerError
  })
}

type ActionsTypes = InferActionsTypes<typeof actions>;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ThunkType = BaseThunkType<ActionsTypes>;
type DispatchType = Dispatch<ActionsTypes>

export const getProfileData = (): ThunkType => async (dispatch: DispatchType) => {
  await Api.getProfile()
    .then((response: any) => {
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
        actions.setProfileData(null, null, null, null, null, null, null, false)
      )
      localStorage.removeItem('token')
      window.location.replace('./login')
    })
}

export const login = (
  email: string,
  password: string,
  type: string
): ThunkType => async (dispatch: DispatchType) => {
  await Api.login(email, password, type)
    .then((response: any) => {
      localStorage.setItem('token', response.token)
      dispatch(actions.setLoginError(''))
    })
    .then(() => {
      window.location.replace('./cabinet')
    })
    .catch((error: AxiosError<ErrorType>) => {
      if (request.isAxiosError(error) && error.response) {
        const formError = error.response.data.errors[0].messages[0]
        dispatch(actions.setLoginError(formError))
      }
    })
}

export const register =
  (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): ThunkType => async (dispatch: DispatchType) => {
    await Api.register(name, email, password, passwordConfirmation)
      .then((response: any) => {
        if (response.success === true) {
          dispatch(actions.setRegisterError(''))
          window.location.replace('./login')
        }
      })
      .catch((error: AxiosError<ErrorType>) => {
        if (request.isAxiosError(error) && error.response) {
          const formError = error.response.data.errors[0].messages[0]
          dispatch(actions.setRegisterError(formError))
        }
      })
  }

export const logout = (): ThunkType => async (dispatch: DispatchType) => {
  localStorage.removeItem('token')
  dispatch(actions.setProfileData(null, null, null, null, null, null, null, false))
  window.location.replace('./login')
}

export default authReducer
