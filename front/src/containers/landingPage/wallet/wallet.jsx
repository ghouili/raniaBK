import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

const wallet = () => {
  return (
    <div className="w-full flex flex-col justify-evenly items-center py-4 bg">
      <div className="w-full flex flex-row justify-evenly items-center py-4 bg">
        <img src="	https://www.advanstunisie.com/fileadmin/user_upload/Icon_Business_Manage-Card_grey_10.svg" alt="services" className='h-64 w-auto ' />
        <h1 className='text-5xl font-bold  text-gray-600 my-20'> Nos Solutions de Remboursement </h1>

      </div>

      <div className=" w-full px-10 flex justify-center flex-col  items-center ">

        <div className=' w-full flex  justify-center items-center text-4xl font-bold px-11 txt-green ' >
          <AiOutlineCheck size={30} />
          <h1 className='w-full flex-1'> Rembourser votre crédit en toute tranquilité </h1>
        </div>
        <div className=' w-full flex py-6 justify-center items-center text-4xl font-bold px-11 txt-green ' >
          <AiOutlineCheck size={30} className=''/>
          <h1 className='w-full flex-1 '> Choisir la solution qui vous convient le mieux </h1>
        </div>
        <div className=' w-full flex  justify-center items-center text-4xl font-bold px-11 txt-green ' >
          <AiOutlineCheck size={30} />
          <h1 className='w-full flex-1'> Remboursement facile et rapide </h1>
        </div>
        <div className=' w-full flex py-6 justify-center items-center text-4xl font-bold px-11 txt-green ' >
          <AiOutlineCheck size={30} />
          <h1 className='w-full flex-1'> Remboursement par Wallet </h1>
        </div>




      </div>
    </div>
  )
}

export default wallet