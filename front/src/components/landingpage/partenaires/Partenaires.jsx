import React from 'react'
import enda from '../../../assets/images/enda.png';
import advans from '../../../assets/images/advans.png';
import zitouna from '../../../assets/images/zitouna.png';

const Partenaires = () => {
  return (
    <div className="w-full flex flex-col items-center py-4">
    <h2 className='text-5xl font-bold text-blue-900 my-20'>NOS PARTENAIRES</h2>

    <div className=" flex flex-row gap-20 animate-pulse ">
               
                {/* //service 01: */}
                <div className="flex flex-col items-center gap-2 ">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src={enda} alt="services" className='h-20 w-auto' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Enda Tamweel</span>
                </div>
                {/*  */}
                {/* //service 02: */}
                <div className="flex flex-col items-center gap-2">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src={advans} alt="services" className='h-20 w-auto' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Advans Tunisie</span>
                </div>

                {/* //service 03: */}
                <div className="flex flex-col items-center gap-2">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src={zitouna} alt="services" className='h-20 w-auto' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Zaytouna Tamkin</span>
                </div>

                
                

            </div>
    </div>
  )
}

export default Partenaires