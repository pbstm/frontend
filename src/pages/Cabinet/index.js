import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/authSelectors'
import CabinetContainer from '../../hoc/CabinetContainer'
import Sessions from './Sessions'
import Locations from './Locations'

const Cabinet = () => {
  const isAuth = useSelector(selectIsAuth)

  if (!isAuth) {
    console.log('auth from cabinet: ', isAuth)
    return <Redirect to="/login" />
  }

  return (
    <CabinetContainer>
      <h1>Cabinet page</h1>
      <Sessions />
      <Locations />
    </CabinetContainer>
  )
}

export default Cabinet
