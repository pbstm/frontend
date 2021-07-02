import React, { useEffect } from 'react'
// prettier-ignore
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { compose } from 'redux'
import store from './redux/redux-store'
import { getProfileData } from './redux/authReducer'
import { getAccessToken } from './const/const'
import Main from './pages/Main'
import Cabinet from './pages/Cabinet'
import CustomerCabinet from './pages/CustomerCabinet'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

const App = () => {
  const dispatch = useDispatch()
  const token = getAccessToken()

  useEffect(() => {
    if (token !== null && token !== undefined) {
      dispatch(getProfileData())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <Switch>
      <Route path="/cabinet" component={Cabinet} />
      <Route path="/customercabinet" component={CustomerCabinet} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
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
