import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

import { ImFacebook2 } from 'react-icons/im'
import { GrLinkedin } from 'react-icons/gr'
import { SiTwitter } from 'react-icons/si'
import { IoLogoYoutube } from 'react-icons/io'

const Register = () => {
  return (
    <div className="w-full  flex  justify-center ">
      <form className="w-4/5  ">
        <div className="w-full flex flex-col items-center py-8 px-52">
          <h1 className='text-2xl text-blue-950 font-bold'>Créez votre compte KHALLASLI gratuitement</h1>




          <ol class="flex items-center w-full mb-10 sm:mb-5 py-12 px-9">
            <li class="flex w-full items-center text-green-500 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-green-500">
              <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-500 shrink-0">
                1 </div>
            </li>

            <li class="flex items-center w-full">
              <div class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                2 </div>
            </li> 
          </ol>

          <form className="w-full  " action="">
             <div class="grid gap-4 mb-4 sm:grid-cols-2 ">
             <div className="flex flex-col gap-3">
              <label htmlFor="nomID" className="text-2xl font-medium">
                Nom 
              </label>
              <input
                type="nom"
                name="nom"
                id="nomID"
                placeholder="Tapze votre Nom..."
                className="border border-gray-500  bg-white px-2 py-4 "
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="PrénomID" className="text-2xl font-medium">
                Prénom
              </label>
              <input
                type="Prénom"
                name="Prénom"
                id="PrénomID"
                placeholder="Tapez votre Prénom..."
                className="border border-gray-500  bg-white px-2 py-4 "
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="TéléphoneID" className="text-2xl font-medium">
                Téléphone
              </label>
              <input
                type="Téléphone"
                name="Téléphone"
                id="TéléphoneID"
                placeholder="Votre Numéro..."
                className="border border-gray-500  bg-white px-2 py-4"
              />
            </div>                    <div className="flex flex-col gap-3">
              <label htmlFor="emailID" className="text-2xl font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="emailID"
                placeholder="Votre Adresse Mail..."
                className="border border-gray-500  bg-white px-2 py-4"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="villeID" className="text-2xl font-medium">
                Ville
              </label>
              <input
                type="ville"
                name="ville"
                id="villeID"
                placeholder="Tapez votre ville..."
                className="border border-gray-500  bg-white px-2 py-4"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="adresseID" className="text-2xl font-medium">
                Adresse
              </label>
              <input
                type="adresse"
                name="adresse"
                id="adresseID"
                placeholder="Votre Adresse..."
                className="border border-gray-500  bg-white px-2 py-4"
              />
            </div>
            </div>
            <div className='w-full flex justify-between py-6'>
              <button type="submit" class="text-gray-400 bg-white border  font-medium rounded-lg text-base px-32 py-3 text-center ">
                Président
              </button>
              <button type="submit" class="text-white bg-blue-950  font-medium rounded-lg text-base px-32 py-3 text-center ">
                SUIVANT
              </button> 
              </div>
             
          </form>
        </div>
        {/* <div className="absolute top-0 left-1/2 h-2 w-32 rounded-b-md bg-blue-950"></div> */}

      
        <div className=''>
        <div className="w-full flex flex-col items-start py-10 px-16 bg">
      <img src={logo} alt="logo" />

      <div className="w-full grid grid-cols-5  gap-4 ">
        <div className="col-span-2  py-10 px-6 text-xl font-semibold ">
          <h1 class=" text-2xl font-bold mb-6  ">A PROPOS DE KHALLASLI </h1>
          <p class=" ">Tous vos paiements, à portée de main.
            <br />
            <span class="  " >
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
    </div>
      
      </form>

      


    </div>
  )
}

export default Register