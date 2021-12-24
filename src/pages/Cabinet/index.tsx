import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { compose } from "redux";
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/authSelectors'
// @ts-ignore
import CabinetContainer from '../../hoc/CabinetContainer.tsx'
import Sessions from './Sessions'
// @ts-ignore
import Locations from './Locations/index.tsx'

const Cabinet: React.FC = () => {
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
