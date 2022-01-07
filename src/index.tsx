import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
// @ts-ignore
import App from './App.tsx'
import reportWebVitals from './reportWebVitals'
import './i18n'

ReactDOM.render(
  <Suspense fallback="loading">
    <App />
  </Suspense>,
  document.getElementById('root')
)

reportWebVitals()
