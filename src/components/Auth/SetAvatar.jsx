import React, { useEffect, useState } from 'react';
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
import { useAuthContext } from '../../context/AuthContext';
import { Selected } from '../../extraFunctions';

function SetAvatar() {
  const femaleAvatars = [fem1, fem2, fem3, fem4, fem5];
  const maleAvatars = [men1, men2, men3, men4, men5];
  


  const {selectedAvatar, setSelectedAvatar , beforeUser} =  useAuthContext()

  const handleAvatarSelect = (avatar) => {
  const pathParts = avatar.split('/');
  const imageName = pathParts[pathParts.length - 1];

    setSelectedAvatar(imageName)
  };

  useEffect(()=>{
    if (beforeUser){
      setSelectedAvatar(beforeUser.avatar)
    }
  } , [])
  return (
    <div className='flex flex-col space-y-3'>
      <h2 className='font-bold text-2xl'>Select Avatar:</h2>
      <div className="avatars flex gap-3 flex-wrap">
        {maleAvatars.map((avatar, index) => (
          <div
            className={`img-container ${ Selected(selectedAvatar , avatar) ?  'border-red-500' : 'border-gray-300 opacity-[50%]'}
             rounded-full border-2  h-[60px] w-[60px] overflow-hidden cursor-pointer
            `}
            key={`male-avatar-${index}`}
            onClick={() => handleAvatarSelect(avatar)}
          >
            <img src={avatar} alt={`Male Avatar ${index + 1}`} />
          </div>
        ))}
        {femaleAvatars.map((avatar, index) => (
          <div
            className={`img-container  ${Selected(selectedAvatar , avatar) ? 'border-red-500' : 'border-gray-300 opacity-[50%]'}
            rounded-full border-2 border-gray-300 h-[60px] w-[60px] overflow-hidden cursor-pointer

            `}
            key={`female-avatar-${index}`}
            onClick={() => handleAvatarSelect(avatar)}
          >
            <img src={avatar} alt={`Female Avatar ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetAvatar;
