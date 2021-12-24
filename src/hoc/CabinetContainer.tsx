import React from 'react'
// @ts-ignore
import CabinetMenu from '../pages/Cabinet/CabinetMenu/index.tsx'
// @ts-ignore
import CabinetHeader from '../pages/Cabinet/CabinetHeader/index.tsx'

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
