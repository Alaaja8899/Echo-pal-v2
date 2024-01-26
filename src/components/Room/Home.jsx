import React, { useEffect, useState } from 'react'
import fem1 from '../../assets/images/avatars/tangiro.png';
import fem2 from '../../assets/images/avatars/annie.png';
import fem3 from '../../assets/images/avatars/sakura.png';
import fem4 from '../../assets/images/avatars/female-4.png';
import fem5 from '../../assets/images/avatars/female-5.png';

import men1 from '../../assets/images/avatars/goku.png';
import men2 from '../../assets/images/avatars/levi.png';
import men3 from '../../assets/images/avatars/gaara.png';
import men4 from '../../assets/images/avatars/luffy.png';
import men5 from '../../assets/images/avatars/vegita.png';
import { Selected, getUsersArray, sliced } from '../../extraFunctions';
import { ref , orderByChild , query, set  } from 'firebase/database'
import { database } from '../../server'
import {useObject , useObjectVal} from "react-firebase-hooks/database"
import { useAuthContext } from '../../context/AuthContext'
import { useRoomContext } from '../../context/RoomContext';
import RoomAudio from "./RoomAudio"

function Home() {
  const {logout , user} = useAuthContext()
  const Avatars = [fem1, fem2, fem3, fem4, fem5 , men1, men2, men3, men4, men5];
  const [avatar , setAvatar] = useState(null)

  const messagesRef = ref(database, `Rooms`);
  const queryRef = query(messagesRef, orderByChild('timestamp'));
  const [snapshot, loading, error] = useObject(queryRef);
  
const snapshotToArray = (snapshot) => {
  const array = [];
  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    array.push(item);
  });
  return array;
};

    const {Room , setRoom} = useRoomContext()
    const [roomName , setRoomName] = useState(null)
  
    const handleSubmit =()=>{
      localStorage.setItem('room' , JSON.stringify( roomName))
      const data = JSON.parse(localStorage.getItem('room'))
      if (data){
        setRoom(data)
      }
        
    }
    useEffect(()=>{
    Avatars.forEach(avt=>{

      if (Selected(user.avatar , avt)){
        setAvatar(avt)
      }


    })
  } , [])


  return (
    <div className='Home'>
    <div className={`wrapper
    ${Room && 'hidden'}
    `}>
    <header className='flex justify-between items-center border-b-2 border-gray-700 py-2'>
      <a href="#!" className="brand font-permanent-marker text-2xl">
      EchoPal
      </a>
      <div className="end flex items-center gap-16">
      <div className="profile w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer" onClick={()=> logout()}>
      <img src={avatar && avatar} alt="user-pic-icons" />
      </div>

      </div>
    </header>

    <button className=' bg-red-500 hover:bg-red-400 p-3 w-full rounded my-1'
    onClick={()=> logout()}
    >
          Update your profile
    </button>


      <form className='flex flex-col  gap-3 mt-4' onSubmit={(e)=> (e.preventDefault() , handleSubmit())} >
            <input onChange={(e)=> setRoomName(e.target.value)}  type="text" placeholder='Title of the room' className='border-2 border-gray-300 bg-transparent p-3 rounded hover:border-red-400  focus:border-red-500 outline-none' required/>
            <button className='p-3 text-white bg-red-500 hover:bg-red-600'>
              Create A new Room
            </button>
      </form>





    <div className="brif mt-8 flex gap-3 flex-col">
    <h2 className=' border-l-4 font-bold text-2xl px-3'>Trending<span className='text-red-500'>Rooms</span></h2>
    <p className='px-3  text-gray-400'>
      Rooms that people in it
    </p>
    </div>
      <div className="rooms flex justify-between flex-wrap gap-2 overflow-auto md:overscroll-none scroll-smooth h-[500px] md:h-fit  mt-5">

        
        {
          snapshot && snapshotToArray(snapshot).map(room =><TrendingRoom  data={room}  />)
        }





      </div>


      </div>

      <div className="">
        {Room && <RoomAudio/>}
      </div>
    </div>
  )
}






const TrendingRoom = (props)=>{
  const roomData = props.data
  const allUsers = getUsersArray(roomData);
  const {setRoom} = useRoomContext();
  const CreateRoom=(room)=>{
    localStorage.setItem('room' , JSON.stringify( room))
    const data = JSON.parse(localStorage.getItem('room'))
    if (data){
      setRoom(data)
    }

  }
  return(
    <div   className="room bg-[rgb(0,0,0,0.1)]  p-6 rounded flex flex-col md:max-w-[25rem] w-full gap-3 focus:bg-green-500" >
      <div className="head">
        <h2 className='font-bold'>
         {roomData.key}
        </h2>
      </div>
      
      <p className=' text-gray-500'>{Object.keys(roomData).length-1} memebers in this Room</p>

      <button className=' bg-red-500 hover:bg-red-400 p-3 rounded' onClick={()=> CreateRoom(roomData.key)}>
          Join This Room 
      </button>
    
    
    </div>
  )

}

export default Home
