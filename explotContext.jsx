import React, { createContext, useContext, useEffect, useState } from 'react';
import AgoraRTC from "agora-rtc-sdk-ng";
import id from '../AppId';
import { GrappUser, database, deleteUser } from '../server';

const audioContext = createContext();

export default function RoomContextPr({ children }) {
  // appStates here 
    const [user , setUser] = useState(null)
    const [users , setUsers] = useState([])    
    const [activeSpeakers , setSpeakers] = useState([])
    const [micState , setMicState] = useState(true)
    const [name , setName ] = useState(null)
    const [profile , setProfile ] = useState(null)
    const [Room , setRoom]  = useState(null)
    const [rtcUid , setRt] = useState(Math.floor(Math.random() * 20232));

  //end



  const appId = id;
  const token = null;

  const [audioTracks, setTracks] = useState({
    LocalAudioTrack: null,
    remoteAudioTracks: {}
  });
  const [rtcClient, setClient] = useState(null);
  
  let initRtc = async () => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    await  setClient(client);


    await client.join(appId, Room, token, rtcUid);
    
    audioTracks.LocalAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    audioTracks.LocalAudioTrack.setMuted(micState)
    await client.publish(audioTracks.LocalAudioTrack);
  
    setUser(rtcUid);
    setUsers((prevUsers) => [...prevUsers,rtcUid]);

  };
  window.addEventListener("beforeunload" ,()=>{
    deleteUser(Room , rtcUid)
  })

  const handleJoin = async (user) => {
    let uid = user.uid;
    setUsers((prevUsers) => [...prevUsers,uid]);
    
  };

  const handleLeft = async (user) => {
    const leftedUser = user.uid;

    const currentUsers = users.filter(user => user !== leftedUser)

    setUsers(currentUsers)
  };
  
  let initVolumeIndicator = async () => {

    //1
    AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 200);
    rtcClient.enableAudioVolumeIndicator();
    
    //2
    rtcClient.on("volume-indicator", volumes => {
      let spUsers = [];
  
      volumes.forEach((volume) => {
        // console.log(`UID ${volume.uid} Level ${volume.level}`);
  
        if (volume.level >= 40){
          spUsers.push(volume.uid); // Use push to add uid to the array
        }
      });
  
      setSpeakers(spUsers);
    })
  }
    

  let handleUserPublished = async (user, mediaType) => {
    await  rtcClient.subscribe(user, mediaType);
  
    if (mediaType == "audio"){
      audioTracks.remoteAudioTracks[user.uid] = [user.audioTrack]
      user.audioTrack.play();
    }
  }
    
  let LeaveChanel = async () => {
    audioTracks.LocalAudioTrack.stop()  
    audioTracks.LocalAudioTrack.close()
    
    rtcClient.unpublish()
    rtcClient.leave()
    deleteUser(Room , rtcUid)
    setUsers([])
    setName(null)
    setProfile(null)
    setRoom(null)
    
  };
  




  useEffect(()=>{
    if (rtcClient !== null){
      rtcClient.on('user-published' , handleUserPublished)  
      rtcClient.on("user-joined" , handleJoin)
      initVolumeIndicator()

    
    }  

  } , [rtcClient])


  useEffect(()=>{
    if (users !== null && users.length > 0){
      rtcClient.on("user-left" , handleLeft)
    }
  }  ,[users])

  useEffect(()=>{
      if (rtcClient){
        audioTracks.LocalAudioTrack.setMuted(micState)
      }
  } , [micState])


  const contextValue = { initRtc   , LeaveChanel , user,users , activeSpeakers , micState , setMicState ,Room , setRoom , name , setName , profile , setProfile , rtcUid };
  
  return (
    <audioContext.Provider value={contextValue}>
      {children}
    </audioContext.Provider>
  );
}

