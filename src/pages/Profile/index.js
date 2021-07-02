import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import ProfileContainer from '../../hoc/ProfileContainer'
import { getAccessToken } from '../../const/const'

const Profile = () => {
  const token = getAccessToken()

  useEffect(() => {
    if (!token) {
      window.location.replace('./login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ProfileContainer>
      <h1>Profile page</h1>
    </ProfileContainer>
  )
}

export default compose(withRouter)(Profile)
