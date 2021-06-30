import React from 'react'
import PropTypes from 'prop-types'
import CabinetMenu from '../pages/Cabinet/CabinetMenu'
import CabinetHeader from '../pages/Cabinet/CabinetHeader'

const CabinetContainer = ({ children }) => (
  <div>
    <CabinetHeader />
    <CabinetMenu />
    <div>{children}</div>
  </div>
)

export default CabinetContainer

CabinetContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
}
