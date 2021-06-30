import React from 'react'
import PropTypes from 'prop-types'
import MainMenu from '../pages/Main/MainMenu'

const MainContainer = ({ children }) => (
  <div>
    <MainMenu />
    <div>{children}</div>
  </div>
)

export default MainContainer

MainContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
}
