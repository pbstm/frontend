import { AxiosResponse } from 'axios';
// @ts-ignore
import { instance } from '../const/const.ts'
/* eslint-disable camelcase */

type UserType = {
  id: number,
  name: string,
  email: string,
  createdAt: number,
  updatedAt: number,
  avatarUrl: string | null,
  type: string
}

type ProfileResponseDataType = {
  success: boolean,
  user: UserType
};

type LoginResponseDataType = {
  success: boolean,
  token: string
};

type UpdateResponseDataType = {
  success: boolean,
};

type ErrorObjectType = {
  key: string,
  messages: Array<string>
}

export type ErrorType = {
  success: boolean,
  errors: Array<ErrorObjectType>
}

const Api = {
  getProfile() {
    return instance
      .get(`profile/show`)
      .then((response: AxiosResponse<ProfileResponseDataType>) => response.data)
  },
  login(email: string, password: string, type: string) {
    return instance
      .post(`/sign_in`, {
        email,
        password,
        type
      })
      .then((response: AxiosResponse<LoginResponseDataType>) => response.data)
  },
  register(name: string, email: string, password: string, password_confirmation: string) {
    return instance
      .post(`/sign_up`, {
        name,
        email,
        password,
        password_confirmation
      })
      .then((response: AxiosResponse<ProfileResponseDataType>) => response.data)
  },
  updateName(name: string) {
    return instance
      .put(`/profile/update`, {
        name
      })
      .then((response: AxiosResponse<UpdateResponseDataType>) => response.data)
  },
  updateEmail(
    email: string,
    current_password: string
  ) {
    return instance
      .put(`/profile/update`, {
        email,
        current_password
      })
      .then((response: AxiosResponse<UpdateResponseDataType>) => response.data)
  },
  updatePassword(
    current_password: string,
    password: string,
    password_confirmation: string
  ) {
    return instance
      .put(`/profile/update`, {
        current_password,
        password,
        password_confirmation
      })
      .then((response: AxiosResponse<UpdateResponseDataType>) => response.data)
  },
  updatePhoto(avatar: File) {
    const formData = new FormData()
    formData.append('avatar', avatar)

    return instance
      .put(`/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response: AxiosResponse<UpdateResponseDataType>) => response.data)
  }
}

export default Api
