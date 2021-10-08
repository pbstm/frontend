import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { compose } from "redux";
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/authSelectors'
import CabinetContainer from '../../hoc/CabinetContainer'
import Sessions from './Sessions'
import Locations from './Locations'

const Cabinet = () => {
  const isAuth = useSelector(selectIsAuth)

  if (!isAuth) {
    return <Redirect to="/login" />
  }

  return (
    <CabinetContainer>
      <Sessions />
      <Locations />
    </CabinetContainer>
  )
}

export default compose(withRouter)(Cabinet)
