import React from 'react'
import CabinetContainer from '../../hoc/CabinetContainer'
import Sessions from './Sessions'
import Locations from './Locations'

const Cabinet = () => (
  <CabinetContainer>
    <h1>Cabinet page</h1>
    <Sessions />
    <Locations />
  </CabinetContainer>
)

export default Cabinet
