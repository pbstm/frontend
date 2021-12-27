import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/authSelectors'
// @ts-ignore
import CustomerCabinetContainer from '../../hoc/CustomerCabinetContainer.tsx'

const CustomerCabinet: React.FC = () => {
  const isAuth = useSelector(selectIsAuth)

  if (!isAuth) {
    return <Redirect to="/login" />
  }

  return (
    <CustomerCabinetContainer>
      <h1>Customer cabinet</h1>
    </CustomerCabinetContainer>
  )
}

export default compose(withRouter)(CustomerCabinet)
