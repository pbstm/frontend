import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './pages/Main'
import Cabinet from './pages/Cabinet'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/cabinet" component={Cabinet} />
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
