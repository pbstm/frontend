import { getAuthUserData } from './authReducer'

const initialState = {
  initialized: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true
      }

    default:
      return state
  }
}

export const actions = {
  initializedSuccess: () => ({
    type: 'INITIALIZED_SUCCESS'
  })
}

export const initializeApp = () => (dispatch) => {
  const promise = dispatch(getAuthUserData())

  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess())
  })
}

export default appReducer
