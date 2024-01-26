import React, { useEffect, useState } from 'react'


import leave from "../../assets/images/icons/leave.svg"
import offMic from "../../assets/images/icons/mic-off.svg"
import Mic from "../../assets/images/icons/mic.svg"
import Members from './Members'
import { useAuthContext } from '../../context/AuthContext'
import { useRoomContext } from '../../context/RoomContext'
export default function RoomAudio() {
    const {} = useAuthContext()

    const {LeaveChanel , micState , setMicState,Room} = useRoomContext()


    const toggleMic=()=>{
        if (!micState){
            setMicState(true)
        }
        else
        setMicState(false)
    }
    return (
    <div className='container mx-auto p-6 flex flex-col'>
        <header className='flex w-full items-center justify-between'>
            <h2 className="roomName font-bold text-2xl">
                {Room}
            </h2>
            <div className="menue flex items-center gap-9">

            <button className={`
            rounded p-2 ${micState ? 'rounded bg-red-500 p-2':'bg-white'}
            `}
            onClick={toggleMic}
            >
                <img src={micState ? offMic:Mic}  />
            </button>

            <button className={`
            rounded bg-red-500 p-2
            `}
            onClick={()=> LeaveChanel()}
            >
                <img src={leave} alt="Leave the room" />
            </button>

            </div>
        </header>


            <Members/>

    </div>
  )
}
