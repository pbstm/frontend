import React from 'react'
import PropTypes from 'prop-types'
import MainMenu from '../components/MainMenu'

const MainContainer = ({ children }) => {
  return (
    <div>
      <MainMenu />
      <div>{children}</div>
    </div>
  )
}

export default MainContainer

MainContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
}
