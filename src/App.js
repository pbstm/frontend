import React from 'react'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import store from './redux/redux-store'
import Main from './pages/Main'
import Cabinet from './pages/Cabinet'
import Login from './pages/Login'

const App = () => (
  <>
    <Switch>
      <Route path="/cabinet" component={Cabinet} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Main} />
    </Switch>
  </>
)

const AppContainer = compose(withRouter)(App)

const MyApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
)

export default MyApp
