import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'
import store from './redux/redux-store'
import { initializeApp } from './redux/appReducer'
import { selectIsInitialized } from './redux/appSelectors'
import Main from './pages/Main'
import Cabinet from './pages/Cabinet'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  const initialized = useSelector(selectIsInitialized)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!initialized) {
    // eslint-disable-next-line no-console
    console.log('no initialized')
  }

  return (
    <>
      <Switch>
        <Route path="/cabinet" component={Cabinet} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Main} />
      </Switch>
    </>
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
