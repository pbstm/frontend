import React from 'react'
// @ts-ignore
import CustomerCabinetMenu from '../pages/CustomerCabinet/CustomerCabinetMenu/index.tsx'

interface ContainerProps {
  children?: React.ReactNode
}

const CustomerCabinetContainer: React.FC = ({ children }: ContainerProps) => (
  <div>
    <CustomerCabinetMenu />
    <div>{children}</div>
  </div>
)

export default CustomerCabinetContainer
