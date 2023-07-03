import React from 'react'
import log from '../../../assets/images/flouss.png';

const Services = () => {
    return (
        <div className="w-full flex flex-col items-center py-4 ">
            <h1 className='text-5xl font-bold text-blue-900 my-20'>Nos Services</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8  gap-4">
                <div className="flex flex-col items-center gap-2">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src={log} alt="services" className='h-20 w-80' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Micro-crédits</span>
                </div>
                {/* //service 01: */}
                <div className="flex flex-col items-center gap-2">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src="https://www.khallasli.com/assets/images/Raccourci/Recharge%20%20T%C3%A9l%C3%A9phonique.svg" alt="services" className='h-20 w-auto' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Recharge Téléphonique</span>
                </div>
                {/*  */}
                {/* //service 02: */}
                <div className="flex flex-col items-center gap-2">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src="	https://www.khallasli.com/assets/images/Raccourci/Paiement%20de%20Facture%20et%20IMF.svg" alt="services" className='h-20 w-auto' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Paiement de Facture et IMF</span>
                </div>

                {/* //service 03: */}
                <div className="flex flex-col items-center gap-2">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src="https://www.khallasli.com/assets/images/Raccourci/Transfert%20d%20argent.svg" alt="services" className='h-20 w-auto' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Le transfert d'argents</span>
                </div>

                {/* //service 04: */}
                <div className="flex flex-col items-center gap-2">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src="	https://www.khallasli.com/assets/images/Raccourci/Recharge%20Cartes%20&%20wallet.svg" alt="services" className='h-20 w-auto' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Recharge Cartes & wallet</span>
                </div>

                {/* //service 05: */}
                <div className="flex flex-col items-center gap-2">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src="https://www.khallasli.com/assets/images/Raccourci/Billetterie%20Avion%20&%20H%C3%B4tels.svg" alt="services" className='h-20 w-auto' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Billetterie Avion & Hôtels</span>
                </div>

                {/* //service 06: */}
                <div className="flex flex-col items-center gap-2">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src="	https://www.khallasli.com/assets/images/Raccourci/bon-de-redu.png" alt="services" className='h-20 w-auto' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Coupons & Tickets</span>
                </div>

                {/* //service 07: */}
                <div className="flex flex-col items-center gap-2">

                    <div className="w-fit flex items-center justify-center rounded-full p-4 hover:shadow-md ">
                        <img src="https://www.khallasli.com/assets/images/Raccourci/Coupons%20Tickets.svg" alt="services" className='h-20 w-auto' />
                    </div>

                    <span className='text-lg font-semibold text-center'>Khallasli Marketplace</span>
                </div>

                {/* //service 08: */}

            </div>
        </div>
    )
}

export default Services