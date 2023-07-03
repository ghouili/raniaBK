import React from 'react'
import rembouser from '../../../assets/images/rembouser.png';
import demande from '../../../assets/images/demande.png';
import { Link } from 'react-router-dom';
const ServiceCrédit = () => {
  return (
  
    <div className="w-full flex flex-col items-center py-4 bg">
        <h1 className='text-5xl font-bold text-blue-900 my-20'>Khallasli est le partenaire financier des entrepreneurs</h1>
        <div className=" flex flex-row gap-20 text-gray-800">
               
               <div className="flex flex-col items-center gap-2  ">
                <Link to='/login'>
                   <div className="w-fit flex  items-center justify-center rounded-full p-4 bg-lime-400 hover:bg-lime-500 ">
                       <img src={demande} alt="services" className='h-28 w-auto ' />
                   </div>

                   <span className='text-lg font-semibold text-center'>Demande De Crédit</span>
                   </Link>
               </div>
              
               <div className="flex flex-col items-center gap-2">
               <Link to='/packs'>
                   <div className="w-fit flex items-center justify-center rounded-full p-4 bg-lime-400 hover:bg-lime-500   ">
                       <img src="https://cdn2.iconfinder.com/data/icons/banking-146/64/payment-service-option-credit-mobile-512.png" alt="services" className='h-28 w-auto' />
                   </div>

                   <span className='text-lg font-semibold text-center'>Packs Disponible</span>
                   </Link>
               </div>

               
               <div className="flex flex-col items-center gap-2">
               <Link to = '/wallet'>
                   <div className="w-fit flex items-center justify-center rounded-full p-4 bg-lime-400 hover:bg-lime-500  ">
                       <img src={rembouser} alt="services" className='h-28 w-auto' />
                   </div>

                   <span className='text-lg font-semibold text-center'>Remboursement Crédit</span>
                   </Link>
               </div>

               
               

           </div>
    </div>
    

  )
}

export default ServiceCrédit