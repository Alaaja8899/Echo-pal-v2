import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './context/AuthContext.jsx'
import RoomContextProvider from './context/RoomContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>

      <RoomContextProvider>
    
    <App />
    
    </RoomContextProvider>

    </AuthContextProvider>
  </React.StrictMode>,
)
