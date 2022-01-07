import React, { useEffect, Suspense } from 'react'
// prettier-ignore
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { compose } from 'redux'
// @ts-ignore
import store from './redux/redux-store.ts'
// @ts-ignore
import { getProfileData } from './redux/authReducer.ts'
// @ts-ignore
import { getAccessToken } from './const/const.ts'
import Main from './pages/Main'
// @ts-ignore
import Cabinet from './pages/Cabinet/index.tsx'
import CustomerCabinet from './pages/CustomerCabinet'
// @ts-ignore
import Login from './pages/Login/index.tsx'
// @ts-ignore
import Register from './pages/Register/index.tsx'
// @ts-ignore
import Profile from './pages/Profile/index.tsx'

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
    <Suspense fallback="loading">
      <Switch>
        <Route path="/cabinet" component={Cabinet} />
        <Route path="/customercabinet" component={CustomerCabinet} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Main} />
      </Switch>
    </Suspense>
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
