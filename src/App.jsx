import { useEffect } from "react"
import Login from "./components/Auth/Login"
import { useAuthContext } from "./context/AuthContext"
import Home from "./components/Room/Home"
import { requestMicrophoneAccess } from "./extraFunctions"

function App() {
  const {user} = useAuthContext()

  useEffect(()=>{

      requestMicrophoneAccess()


  } , [])



  return (
    <div className='App bg-[#242424] text-[#ffffffdf] min-h-screen p-6'>

    
      {
        user !== null ? <Home/> : <Login/>
      }

    </div>
  )
}

export default App
