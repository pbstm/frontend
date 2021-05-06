import React from 'react'
import PropTypes from 'prop-types'
import CabinetMenu from '../components/CabinetMenu'

const CabinetContainer = ({ children }) => {
  return (
    <div>
      <CabinetMenu />
      <div>{children}</div>
    </div>
  )
}

export default CabinetContainer

CabinetContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
}
