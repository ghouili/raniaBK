import React from 'react'
import logo from '../../../assets/images/logo.png';

import { ImFacebook2 } from 'react-icons/im'
import { GrLinkedin } from 'react-icons/gr'
import { SiTwitter } from 'react-icons/si'
import { IoLogoYoutube } from 'react-icons/io'
const Contactez = () => {
  return (
    <div className="w-full flex flex-col items-start py-10 px-16 bg">
      <img src={logo} alt="logo" />

      <div className="w-full grid grid-cols-5  gap-4 ">
        <div className="col-span-2  py-10 px-6 text-xl font-semibold ">
          <h1 className=" text-2xl font-bold mb-6  ">A PROPOS DE KHALLASLI </h1>
          <p className=" ">Tous vos paiements, à portée de main.
            <br />
            <span className="  " >
              Tous vos paiements, à portée de main.
              KHALLASLIest la première plateforme de paiement tunisienne
              qui vous permet d'effectuer diverses transactions
              sécurisées instantanément.
            </span>
            </p>
        
        </div>

      <div className=" py-10 px-2 text-xl font-semibold ">
          <h1 className='text-2xl font-bold'>NOS SERVICES</h1>
          <div className="flex flex-col gap-6 px-2 mt-6">
            <h2>Recharge Téléphonique</h2>
            <h2>Paiement De Facture</h2>
            <h2>Recharge Carte&solde</h2>
            <h2>Paiement e-commerce</h2>
            
          </div>
          
        </div>

        <div className=" py-10 px-2 text-xl font-semibold ">
          <h1 className='text-2xl font-bold'>LIEN RAPIDE</h1>
          <div className="flex flex-col gap-6 px-2 mt-9">
            <h2>Guide d’activation coupon</h2> 
            <h2>FAQ</h2>
            <h2>Rejoindre-nous</h2>
            <h2>Politique de confidentialité</h2>
            
          </div>
          
        </div>

        <div className=" py-10 px-2 text-xl font-semibold ">
          <h1 className='text-2xl font-bold'>INFO</h1>
          <div className="flex flex-col gap-6 px-2 mt-6">
            <h2>+216 73368020</h2>
            <h2>+216 29976658</h2>
            <h2>+216 29976659</h2>
            
          </div>
          <br />
          <div className='flex items-center justify-evenly  text-blue-950 ' >
            <ImFacebook2 size={25} href='https://www.facebook.com/khallaslitunisia' />
            <GrLinkedin size={25} />
            <SiTwitter size={25} />
            <IoLogoYoutube size={25} />

          </div>
        </div>

        
        
      </div>
    </div>



  )
}

export default Contactez