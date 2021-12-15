import { Action, combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
// @ts-ignore
import authReducer from './authReducer.ts'
// @ts-ignore
import changeProfileReducer from './changeProfileReducer.ts'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: changeProfileReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>; // global state

// type for action creators
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

// type for thunks
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
