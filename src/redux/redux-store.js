import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import authReducer from './authReducer'
import changeProfileReducer from './changeProfileReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: changeProfileReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
