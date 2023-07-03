import React from 'react'

import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { FiPhoneCall } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'
import Cookies from 'universal-cookie';

const Navbar_ = () => {

    const cookies = new Cookies();

  let user;
  user = cookies.get('user');

  return (
    <div className='navbar'>


      <div className='flex justify-between px-12 py-3 h-17'   >
        <Link to='/Slider'>
          <img src={logo} alt="logo" /></Link>

        <div className='flex gap-3 items-center font-medium text-blue-950 text-md' >
          <FiPhoneCall size={20} />
          <p >53972874</p>
          <GoMail size={20} />
          <p>boukabousrania2@gmail.com</p>
        </div>

      
        {user ?
          <div className='flex items-center gap-4 '>
            <h1>{user.role}</h1>
          </div>
          :
          <div className='flex items-center gap-4 '>

           </div>
        }

      </div>

    </div>
  )
}

export default Navbar_