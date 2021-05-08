import React from 'react'
import ReactDOM from 'react-dom'
import MyApp from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MyApp />, div)
  ReactDOM.unmountComponentAtNode(div)
})
