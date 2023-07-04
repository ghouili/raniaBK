import React from 'react'

import { AdminNavbar, Navbar, Navbar_, Notification, Sidebar } from '../components';
import { Register, Login, LandingPage, Packs, Wallet, Simulateur, User, Finance, Pointvente, Offres, Users, Pdvs, PdvRequests, Dashboard, Nospack, PackDetails, Credit, Offres_pack, Profile, NCredit } from '../containers';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
//import axios from 'axios';
import PrivetRoute from './PrivetRoute';
import Test from '../containers/simulateur/Test';
//import Offres from '../containers/PDV/Offres';

const MainRoutes = () => {
  const location = useLocation();
  const cookies = new Cookies();
  let user = null;
  user = cookies.get('user');

  return (
    <div className={`relative w-screen min-h-screen flex bg-LightBGColor `}>
      <Notification />


      {['/login', '/register'].includes(location.pathname) || !user ? null :
        <Sidebar />
      }
      <div className='w-full pt-4 px-6' >

        {['/login', '/register'].includes(location.pathname) ? null :
          <>
            {user ?
              <>
                {user ?
                  <AdminNavbar />
                  :
                  <Navbar />
                }
              </>
              :
              <Navbar />
            }
          </>
        }
        <div className=' overflow-auto h-fit' style={!user || ['/login', '/register'].includes(location.pathname) ? {} : { maxHeight: '97vh' }} >
          <Routes>

            <Route index element={user ? <Dashboard /> : <LandingPage />}
            />

            <Route path='login' element={
              <Login />
            } />

            <Route path='/user/:id' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Profile />
              </PrivetRoute>
            } />

            <Route path='pdvs' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Pdvs />
              </PrivetRoute>
            } />

            <Route path='requests' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <PdvRequests />
              </PrivetRoute>
            } />

            <Route path='packs' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Packs />
              </PrivetRoute>
            } />

            <Route path='packs/credit' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Offres_pack />
              </PrivetRoute>
            } />

            <Route path='nospack' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Nospack />
              </PrivetRoute>
            } />

            <Route path='pack/:id' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <PackDetails />
              </PrivetRoute>
            } />

            <Route path='wallet' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Wallet />
              </PrivetRoute>
            } />

            <Route path='register' element={
              <Register />
            } />

            <Route path='simulateur' element={
              <Simulateur />
            } />

            <Route path='users' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Users />
              </PrivetRoute>
            } />

            <Route path='finance' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Finance />
              </PrivetRoute>
            } />

            <Route path='pdv' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Pointvente />
              </PrivetRoute>
            } />

            <Route path='credit' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Credit />
              </PrivetRoute>
            } />
            <Route path='ncredit' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <NCredit />
              </PrivetRoute>
            } />

            <Route path='offres/:id' element={
              <PrivetRoute permissions={['admin', 'pdv', 'finance']} >
                <Offres />
              </PrivetRoute>
            } />

          </Routes>
        </div>
      </div>
    </div >
  )
}

export default MainRoutes