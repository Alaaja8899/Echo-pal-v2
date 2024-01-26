import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import AgoraRTC from "agora-rtc-sdk-ng";
import id from '../AppId';
import { GrappUser, database, deleteUser } from '../server';

const roomContext = createContext()

function RoomContextProvider({children}) {
    const {user} = useAuthContext()
    const data = JSON.parse(localStorage.getItem('room'))
    const [Room , setRoom] = useState(data ? data:null)
    const [micState ,setMicState] = useState(true)
    const [activeSpeakers , setSpeakers] = useState(null)
    
    const [rtcClient, setClient] = useState(null);
    const [audioTracks, setTracks] = useState({
        LocalAudioTrack: null,
        remoteAudioTracks: {}
      });
    let initRtc = async () => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    await  setClient(client);


    await client.join(id, Room, null, user.id);
    
    audioTracks.LocalAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish(audioTracks.LocalAudioTrack);
    audioTracks.LocalAudioTrack.setMuted(micState)
    
    };
    window.addEventListener("beforeunload" ,()=>{
    deleteUser(Room , user.id)
    })
    
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
     

    useEffect(()=>{
        if (rtcClient !==null){
            rtcClient.on("user-published", handleUserPublished);
            initVolumeIndicator()

        }
    } , [rtcClient])


    useEffect(()=>{
        if (rtcClient){
          audioTracks.LocalAudioTrack.setMuted(micState)
        }
    } , [micState])
  













    const LeaveChanel = ()=>{
        
        rtcClient.unpublish()
        rtcClient.leave()    
        deleteUser(Room , user.id)
        localStorage.removeItem("room")
        const data = JSON.parse(localStorage.getItem('room'))
        setRoom(data ? data:null)
    }


    
    const contextValue = {Room , setRoom , micState , setMicState , LeaveChanel , activeSpeakers , initRtc}
    return (
    <roomContext.Provider value={contextValue}>
        {children}
    </roomContext.Provider>
  )
}



export const useRoomContext=()=>{
    return useContext(roomContext)
}

export default RoomContextProvider
