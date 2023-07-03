import './navbar.css';
import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { FiPhoneCall } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'
import Cookies from 'universal-cookie';
const Navbar = () => {
  const cookies = new Cookies();

  let user;
  user = cookies.get('user');

  return (
    <div className='navbar'>


      <div className='flex justify-between px-12 py-3 h-17'   >
        <Link to='/'>
          <img src={logo} alt="logo" /></Link>

        <div className='flex gap-3 items-center font-medium text-blue-950 text-md' >
          <FiPhoneCall size={20} />
          <p >53972874</p>
          <GoMail size={20} />
          <p>boukabousrania2@gmail.com</p>
        </div>

      </div>
      <div className="nav-split" />
      <div className=' flex items-center justify-between px-6 py-2'>
        <div className='flex gap-4 item-center text-lg font-bold  text-blue-900  '>
          <span>Accueil</span>
          <span>Nos services</span>
          <span>A Propos de Crédit</span>
          <span>Nos Partenaires</span>

          <span>Contact</span>
        </div>
        {user ?
          <div className='flex items-center gap-4 '>
            <h1>{user.role}</h1>
          </div>
          :
          <div className='flex items-center gap-4 '>

            <Link to='/login' className='green-btn border rounded-md text-white px-6 py-2 font-medium '>Connexion</Link>
            <Link to='/register' className='border rounded-md bg-blue-900 text-white px-6 py-2 font-medium ' >Devenir Agent</Link>
          </div>
        }

      </div>

    </div>

  )
}

export default Navbar