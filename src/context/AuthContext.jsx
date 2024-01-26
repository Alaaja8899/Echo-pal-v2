import React, { createContext, useContext, useState } from 'react'
import { generateRandomNineDigitNumber } from '../extraFunctions';
const AuthContext = createContext()
export default function AuthContextProvider({children}) {
    const data = JSON.parse(localStorage.getItem('user'))
    const [user , setUser] = useState(data ? data:null)
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [beforeUser , setBeforeUser] = useState()
    const [ID , setID] = useState(beforeUser ? beforeUser.id:generateRandomNineDigitNumber())
   
   
    const logout=()=>{
      setBeforeUser(JSON.parse(localStorage.getItem('user')))
      setID(user.id)
      localStorage.removeItem('user')
      const data = JSON.parse(localStorage.getItem('user'))
      setUser(data ? data:null)
    }
   
    const contextValue = {user , setUser ,  selectedAvatar, setSelectedAvatar , ID , logout , beforeUser}
  return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
}


export const useAuthContext=()=>{
    return useContext(AuthContext)
}