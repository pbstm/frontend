import React from 'react'
import CabinetMenu from '../pages/Cabinet/CabinetMenu'
import CabinetHeader from '../pages/Cabinet/CabinetHeader'

interface ContainerProps {
  children?: React.ReactNode
}

const CabinetContainer: React.FC = ({ children }: ContainerProps) => (
  <div>
    <CabinetHeader />
    <CabinetMenu />
    <div>{children}</div>
  </div>
)

export default CabinetContainer
