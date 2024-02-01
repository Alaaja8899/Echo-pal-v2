export function generateRandomNineDigitNumber() {
    // Generate a random number between 100,000,000 and 999,999,999
    const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
    return randomNumber;
  }

export    const Selected = (exist , check)=>{
  const pathParts = check.split('/');
  const imageName = pathParts[pathParts.length - 1];  

  if (imageName === exist){
    return true
  }
  else{
    return false
  }

}


export function getUsersArray(roomData) {
  const usersArray = [];

  for (const userId in roomData) {
    if (roomData.hasOwnProperty(userId) && typeof roomData[userId] === 'object') {
      usersArray.push(roomData[userId]);
    }
  }

  return usersArray;
}

export const sliced =(arr , SliceNumber)=>{
  let newArr =[]
  for (let i=0 ; i<=SliceNumber; i++){
      newArr.push(arr[i])
  }

  return newArr;
}



export function requestMicrophoneAccess() {
  // Check if the browser supports getUserMedia
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Request access to the microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log('Access to microphone granted.');
        // Do something with the microphone stream if needed
      })
      .catch(function(error) {
        console.error('Error accessing microphone:', error);
        // Handle error, possibly prompt the user to try again
      });
  } else {
    console.error('getUserMedia is not supported in this browser.');
    // Handle lack of support for getUserMedia
  }
}
