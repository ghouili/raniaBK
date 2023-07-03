import React from 'react'
import { Services, Slider , ServiceCrédit ,Contactez  ,Partenaires ,} from '../../components'

const LandingPage = () => {
  return (
    <div className='w-full'>
        <Slider />
        <Services />
        <ServiceCrédit />
        <Partenaires />
        <Contactez />
        
    </div>
  )
}

export default LandingPage