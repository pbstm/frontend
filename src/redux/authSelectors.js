export const selectIsAuth = (state) => state.auth.isAuth

export const selectName = (state) => state.auth.name

export const selectType = (state) => state.auth.type

export const selectEmail = (state) => state.auth.email

export const selectAvatarUrl = (state) => state.auth.avatarUrl

export const selectLoginError = (state) => state.auth.loginError

export const selectRegisterError = (state) => state.auth.registerError
