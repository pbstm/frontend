import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import authReducer from './authReducer'
import appReducer from './appReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store