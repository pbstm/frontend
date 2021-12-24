import React from 'react'
// @ts-ignore
import ProfileMenu from '../pages/Profile/ProfileMenu/index.tsx'

interface ContainerProps {
  children?: React.ReactNode
}

const ProfileContainer: React.FC = ({ children }: ContainerProps) => (
  <div>
    <ProfileMenu />
    <div>{children}</div>
  </div>
)

export default ProfileContainer
