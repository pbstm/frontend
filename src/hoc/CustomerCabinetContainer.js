import React from 'react'
import PropTypes from 'prop-types'
import CustomerCabinetMenu from '../pages/CustomerCabinet/CustomerCabinetMenu'

const CustomerCabinetContainer = ({ children }) => (
  <div>
    <CustomerCabinetMenu />
    <div>{children}</div>
  </div>
)

export default CustomerCabinetContainer

CustomerCabinetContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
}
