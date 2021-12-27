import React from 'react'
// @ts-ignore
import MainMenu from '../pages/Main/MainMenu/index.tsx'

interface ContainerProps {
  children?: React.ReactNode
}

const MainContainer: React.FC = ({ children }: ContainerProps) => (
  <div>
    <MainMenu />
    <div>{children}</div>
  </div>
)

export default MainContainer
