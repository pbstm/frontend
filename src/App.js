import React, { useEffect } from 'react'
// prettier-ignore
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import store from './redux/redux-store'
import { initializeApp } from './redux/initializeReducer'
import { selectIsInitialized } from "./redux/initializeSelectors";
import Main from './pages/Main'
import Cabinet from './pages/Cabinet'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  const initialized = useSelector(selectIsInitialized);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
    console.log('dispatched initializeapp', initialized)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectIsInitialized])

  return (
    <Switch>
      <Route path="/cabinet" component={Cabinet} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={Main} />
    </Switch>
  )
}

const AppContainer = compose(withRouter)(App)

const MyApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
)

export default MyApp
