import React from 'react'
import PropTypes from 'prop-types'
import ProfileMenu from '../pages/Profile/ProfileMenu'

const ProfileContainer = ({ children }) => (
  <div>
    <ProfileMenu />
    <div>{children}</div>
  </div>
)

export default ProfileContainer

ProfileContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
}
