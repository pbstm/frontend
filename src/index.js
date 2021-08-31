import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './i18n'

ReactDOM.render(
  <Suspense fallback="loading">
    <App />
  </Suspense>,
  document.getElementById('root')
)

reportWebVitals()
