import React from 'react'
import SetAvatar from './SetAvatar'
import RegisterForm from "./RegisterForm"
import Me from '../Me'
import { useRoomContext } from '../../context/RoomContext'

const Login = () => {
  return (
    <div>
        <SetAvatar/>
        <RegisterForm/>
        
    </div>
  )
}

export default Login
