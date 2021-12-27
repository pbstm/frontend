import React, { useEffect, Suspense, ComponentType } from 'react'
// prettier-ignore
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { compose } from 'redux'
// @ts-ignore
import store from './redux/redux-store.ts'
// @ts-ignore
import { getProfileData } from './redux/authReducer.ts'
import { getAccessToken } from './const/const'
// @ts-ignore
import Main from './pages/Main/index.tsx'
// @ts-ignore
import Cabinet from './pages/Cabinet/index.tsx'
// @ts-ignore
import CustomerCabinet from './pages/CustomerCabinet/index.tsx'
// @ts-ignore
import Login from './pages/Login/index.tsx'
// @ts-ignore
import Register from './pages/Register/index.tsx'
// @ts-ignore
import Profile from './pages/Profile/index.tsx'

const App: React.FC = () => {
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

const AppContainer = compose<ComponentType>(withRouter)(App)

const MyApp: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
)

export default MyApp
