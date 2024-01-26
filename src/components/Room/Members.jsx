import React, { useEffect } from 'react'
import avatar1 from "../../assets/images/avatars/male-1.png"
import avatar2 from "../../assets/images/avatars/male-2.png"
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

import { ref , orderByChild , query  } from 'firebase/database'
import { GrappUser, database } from '../../server'
import {useObject , useObjectVal} from "react-firebase-hooks/database"
import { useRoomContext } from '../../context/RoomContext'
import { useAuthContext } from '../../context/AuthContext'
import { Selected } from '../../extraFunctions';

function Members() {

    const {activeSpeakers ,   Room , initRtc} = useRoomContext()
    const {user} = useAuthContext()
    const messagesRef = ref(database, `Rooms/${Room}`);
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
  const Avatars = [fem1, fem2, fem3, fem4, fem5 , men1, men2, men3, men4, men5];
  
useEffect(()=>{
  GrappUser(user.avatar , user.id , user.name ,Room)
  initRtc()
} , [])
  
  return (
    <div className='mt-10 flex gap-4 flex-wrap '>


                {snapshot && snapshotToArray(snapshot).map((user)=>(

                        <div className="member-user flex flex-col w-fit items-center justify-center text-center gap-3">
                        <div className={`
                        avata-user
                        rounded-full w-[80px] h-[80px] overflow-hidden 
                        border-2 border-gray-300
                        ${activeSpeakers && activeSpeakers.map(spUser => spUser == user.uid? 'border-green-500':'')}
                        `}>
                            <img src={Avatars.filter(avt => Selected(user.photo , avt))}  />
                        </div>
                        <h2 className="">
                            {user.name}
                        </h2>
                        </div>
                        
                
                ))}




    </div>
  )
}

export default Members
