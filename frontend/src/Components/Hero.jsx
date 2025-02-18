import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  return (
    <div className=' container mx-auto pt-40 pb-14'>
        <div className='flex flex-col justify-center items-center gap-6 text-[#2B2A2D]'>
            <h1 className=' text-center text-3xl px-[4px] sm:text-5xl font-semibold text-[#2B2A2D] font-serif'>Welcome to Recruit AI</h1>
            <p className='text-center px-4 text-base font-normal sm:font-medium'>Revolutionizing the way you hire with AI-powered solutions</p>
            <button 
              onClick={() => navigate('/registration')} // Navigate to Registration page
              className="bg-[#0f172a] text-white hover:text-[#0f172a] hover:bg-transparent border-2 border-[#0f172a] px-4 py-2 rounded-full transition-colors duration-300"
            >
              Get Started Now
            </button>

        </div>
      
    </div>
  )
}

export default Hero
