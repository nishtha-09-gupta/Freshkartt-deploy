import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block'/>
      <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden'/>

      <div className='absolute inset-0 flex flex-col items-center md:items-end justify-end md:justify-center pb-12 md:pb-0 px-4 md:pr-20 lg:pr-28'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-right max-w-[90%] md:max-w-[420px] lg:max-w-[520px] leading-snug md:leading-tight text-[#002410]'>
          Freshness Served At Your Doorstep
        </h1>

        <div className='flex items-center mt-6 font-medium gap-4 justify-center md:justify-end'>
          <Link
            to={"/products"}
            className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'
          >
            Shop now
            <img className='transition group-hover:translate-x-1 md:hidden' src={assets.white_arrow_icon} alt="arrow" />
          </Link>

          <Link
            to={"/products"}
            className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'
          >
            Explore deals
            <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
