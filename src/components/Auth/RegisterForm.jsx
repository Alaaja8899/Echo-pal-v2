import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'


const RegisterForm = () => {

  const {user , setUser , selectedAvatar , ID , beforeUser} = useAuthContext()

  const [name , setName] = useState(null)
  const [bio , setBio] = useState(null)


  const handleSubmit=()=>{
      if (!selectedAvatar){
        alert("Selected an avatar || profile pic")
      }
      else{

        const userData ={
          name : name , 
          bio : bio , 
          avatar : selectedAvatar,
          id : ID
        }

        localStorage.setItem('user' , JSON.stringify( userData))
        const data = JSON.parse(localStorage.getItem('user'))
        if (data){
          setUser(data)
        }
      }
  }

  useEffect(()=>{
      if (beforeUser){
        setName(beforeUser.name)
        setBio(beforeUser.bio)
      }
  } , [])
  return (
    <div className='mt-10'>
        <form className='flex flex-col space-y-4' onSubmit={(e)=> (e.preventDefault() , handleSubmit())} >
            <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Enter UserName ...' className='border-2 border-gray-300 bg-transparent p-3 rounded hover:border-red-400  focus:border-red-500 outline-none' required/>
            <input onChange={(e) => setBio(e.target.value)} value={bio} type="text" placeholder='Bio   or || write Your updates like --Good evening or your fav Quote ' className='border-2 border-gray-300 bg-transparent px-3 py-5 rounded hover:border-red-400  focus:border-red-500 outline-none' required/>
            <button className='p-3 text-white bg-red-500 hover:bg-red-600'>
                {beforeUser ? "Update profile " : "Create Profile"} 
            </button>
        </form>
    </div>
  )
}


export default RegisterForm