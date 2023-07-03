import React from 'react';
import credit from '../../../assets/images/serv.png';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
    return (
        <div className="w-full py-12 bg ">
            <Swiper
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false
                }}
                keyboard={{
                    enabled: true,
                }}
                slidesPerView={1}
                grabCursor={true}
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Autoplay]}
                className='mySwiper w-full h-96'

            >   <SwiperSlide className='w-full h-full ' >
            <div className="w-full h-full flex items-center justify-center gap-48">
                <div className="flex flex-col gap-4">
                    <h1 className='txt-green text-4xl font-bold ' >MICRO-CEDITS</h1>
                    <h1 className='text-3xl font-bold text-blue-950' >Crédits Individuels , crédit ...</h1>
                </div>
                <img src={credit} alt="service" className='h-80 w-auto' />
            </div>
        </SwiperSlide>
                <SwiperSlide className='w-full h-full ' >
                    <div className="w-full h-full flex items-center justify-center gap-48">
                        <div className="flex flex-col gap-4">
                            <h1 className='txt-green text-4xl font-bold ' >Recharge Telephonique</h1>
                            <h1 className='text-3xl font-bold text-blue-950' >Steg, Soned <br /> telecom...</h1>
                        </div>
                        <img src="https://www.khallasli.com/assets/images/landing/Frame.png" alt="service" className='h-80 w-auto' />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='w-full h-full' >
                    <div className="w-full h-full flex items-center justify-center gap-48">
                        <div className="flex flex-col gap-4">
                            <h1 className='txt-green text-4xl font-bold ' >RECHARGE TELEPHONIQUE</h1>
                            <h1 className='text-2xl font-bold text-blue-950' >VOUCHER ,TOPUP  <br />INTERNET SABBA</h1>
                        </div>
                        <img src="https://www.khallasli.com/assets/images/landing/gaming%20streming.png" alt="service" className='h-80 w-auto' />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='w-full h-full' >
                    <div className="w-full h-full flex items-center justify-center gap-48">
                        <div className="flex flex-col gap-4">
                            <h1 className='txt-green text-4xl font-bold ' >PAIEMENT TELEPHONIQUE</h1>
                            <h1 className='text-2xl font-bold text-blue-950' >STEG, SONEDE,TOPNET <br /> TELECOM...</h1>
                        </div>
                        <img src="https://www.khallasli.com/assets/images/landing/invoice.png" alt="service" className='h-80 w-auto' />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='w-full h-full' >
                    <div className="w-full h-full flex items-center justify-center gap-48">
                        <div className="flex flex-col gap-4">
                            <h1 className='txt-green text-4xl font-bold ' >RESERVATION DES HOTELS</h1>
                            <h1 className='text-2xl font-bold text-blue-950' >VOUCHER, HOTELS</h1>
                        </div>
                        <img src="https://www.khallasli.com/assets/images/landing/hotel.png" alt="service" className='h-80 w-auto' />
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    )
}

export default Slider