import { initializeApp } from "firebase/app";
import { getDatabase  ,serverTimestamp , ref , set , onChildAdded , onValue , get , child , orderByChild , remove} from "firebase/database";
import { useRef } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyA9kbGgieISsAoYeB_cjD0gKxrodiuoMY8",
    authDomain: "audio-storing.firebaseapp.com",
    databaseURL: "https://audio-storing-default-rtdb.firebaseio.com",
    projectId: "audio-storing",
    storageBucket: "audio-storing.appspot.com",
    messagingSenderId: "747799475898",
    appId: "1:747799475898:web:bce2ceeac57a68a3a13483"
  };
  
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);



export const GrappUser = (photo , userID , name , room) => {

    const userRef = ref(database, `Rooms/${room}/${userID}`);
    set(userRef, {
      timestamp: serverTimestamp(),
      name : name, 
      uid : userID,
      photo:photo
    }).then(() => {
    }).catch((error) => {
    });
  };
  export const deleteUser = async (room, userID) => {
    const userRef = ref(database, `Rooms/${room}/${userID}`);

    try {
        await remove(userRef);
        console.log("deleted successfully!");
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

