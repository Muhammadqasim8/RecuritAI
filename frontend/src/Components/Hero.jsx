import React from 'react'
import Button from './Button'

const Hero = () => {
  return (
    <div className=' container mx-auto pt-40 pb-14'>
        <div className='flex flex-col justify-center items-center gap-6 text-[#2B2A2D]'>
            <h1 className=' text-center text-3xl px-[4px] sm:text-5xl font-semibold text-[#2B2A2D] font-serif'>Welcome to Recruit AI</h1>
            <p className='text-center px-4 text-base font-normal sm:font-medium'>Revolutionizing the way you hire with AI-powered solutions</p>
            <Button className="bg-[#0f172a] text-base font-medium hover:text-[#0f172a] hover:bg-transparent border-2 border-[#0f172a] ">Get Started Now</Button>

        </div>
      
    </div>
  )
}

export default Hero
