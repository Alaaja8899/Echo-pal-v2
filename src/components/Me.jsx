import React, { useState } from 'react'
import pic1 from "../assets/images/Me/3.jpg"
import pic2 from "../assets/images/Me/4.jpg"
import pic3 from "../assets/images/Me/5.jpg"
import { useRoomContext } from '../context/RoomContext'
function Me() {

        const avatars =  [pic1,pic2 , pic3]

        const [selectedPic ,setPic] = useState(avatars[1])
        const {toggleAuthor} = useRoomContext()



  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 bg-transparent z-10 md:p-3 w-full'>
                        <button
                        onClick={()=> toggleAuthor()}
                        className='px-3 py-2 bg-red-500 w-full'
                        > {`<-  Go back`} </button>


        <div className="container-card bg-black min-h-[90%] rounded flex gap-4 flex-wrap">

            

            <div className="side1 md:w-fit w-full">

                <div className="img-gellery p-3 flex flex-col md:items-start items-center ">
                    <div className="img-container max-w-[300px] border border-red-500">
                    <img src={selectedPic} className='h-full w-full' />
                    </div>
                    <div className="slides flex space-x-2 mt-5">

                      <div className={`im1 w-[60px] border cursor-pointer ${selectedPic==pic1 ? 'border-red-500':''}`} onClick={()=>setPic(pic1)}>
                                <img src={pic1} alt="" />
                      </div>
                      <div className={`im1 w-[60px] border cursor-pointer ${selectedPic==pic2 ? 'border-red-500':''}`} onClick={()=>setPic(pic2)}>
                          <img src={pic2} alt="" />
                      </div>
                      <div className={`im1 w-[60px] border cursor-pointer ${selectedPic==pic3 ? 'border-red-500':''}`} onClick={()=>setPic(pic3)}>
                            <img src={pic3} alt="" />
                      </div>
                    </div>
                </div>




            </div>
            <div className="side2 md:w-1/2 p-3">

              <div className="info flex flex-col space-y-1">
                <h2 className="name font-bold text-2xl">
                      Abdirizak abdullahi hussein(Alaaja)
                </h2>
                <h2 className="t  text-2xl">
                      CEO & Founder of <span className='text-red-500 font-bold'>EchoPal</span>
                </h2>
                <p className='text-gray-300'>
                FrontEnd Engineer 👨‍💻 +|+ 2D Game developer 🎮
                </p>
                <div className="socials flex gap-3">
                    <a className='bg-red-500 rounded p-3 hover:text-red-500  hover:bg-white text-2xl' href="https://github.com/Alaaja8899"><i class='bx bxl-github'></i></a>
                    <a className='bg-red-500 rounded p-3 hover:text-red-500  hover:bg-white text-2xl' href="https://wa.me/252611430930"><i class='bx bxl-whatsapp'></i></a>
                    <a className='bg-red-500 rounded p-3 hover:text-red-500  hover:bg-white text-2xl' href="https://www.facebook.com/profile.php?id=100079169779779"><i class='bx bxl-facebook-circle'></i></a>
                </div>
                <div className="about">
                  <p className="">
                  Hello! I'm Abdirizak Abdullahi Hussein, also known as Alaaja, the CEO and Founder of EchoPal. My vision for EchoPal stems from a desire to create a vibrant and inclusive space where people can come together to connect, communicate, and collaborate through the power of voice.

As technology continues to evolve, I believe in the importance of maintaining authentic human connections. EchoPal is designed to break down barriers and facilitate meaningful conversations by offering a platform where users can seamlessly join different rooms and engage in group voice chats on a wide range of topics.

Whether you're looking to socialize, share ideas, or simply listen in on interesting discussions, EchoPal welcomes you to join our community. Together, let's amplify voices and build connections that transcend boundaries.

Thank you for being a part of the EchoPal journey.                    

                  </p>
                </div>
              </div>

            </div>


        </div>

    </div>
  )
}

export default Me
