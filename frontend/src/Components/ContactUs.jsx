import React from 'react';
import Button from './Button';

const ContactUs = () => {
  return (
    <div className='bg-[#0f172a] pt-20px'>
      <div className='container mx-auto '>
        <h1 className=' text-center text-3xl px-[4px] sm:text-5xl font-semibold text-white font-serif pt-10'>Contact US</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 py-20  px-6  gap-6'>
          <div className='p-[25px] md:p-[35px] bg-white mt-20px'>
            <form  className=" p-4">
      <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
      <p className="text-gray-600 text-base mb-6">Our friendly team would love to hear from you.</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-normal mb-2">
          First name
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border-[1px] border-black  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Name *"
         
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-normal mb-2">
          Your Email
        </label>
        <input
          type="email"
          
          className="shadow appearance-none  border-[1px] border-black  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email *"
          
        />
      </div>


        </div>
      
      <div className="mb-4">
        <label htmlFor="subject" className="block text-gray-700 text-sm font-normal mb-2">
          Subject
        </label>
        <input
          type="text"
          
          className="shadow appearance-none border-[1px] border-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Subject *"
          
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 text-sm font-normal mb-2">
          Your message
        </label>
        <textarea
          id="message"
          className="shadow appearance-none border-[1px] border-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your message *"
          
          required
        />
      </div>
      <div>
      <Button className="bg-[#0f172a] text-base font-medium hover:text-[#0f172a] hover:bg-transparent border-2 border-[#0f172a] ">Get Started Now</Button>
          </div>


     
      
    </form>
          </div>
          <div className='w-full flex justify-center sm:justify-end '>
            <div className='w-full sm:w-[80%] '>
            {/* <img src={Images.cntbg} alt="img" /> */}
            <div className='flex justify-start items-center gap-4 pt-8'>
            <div className='flex text-black bg-[#9BD3D0]  justify-center items-center p-6 '>
            <i class="fas fa-envelope text-[30px]"></i>
            
        </div>
            <div className='flex flex-col gap-2 justify-start items-start'>
                <h5 className='text-base uppercase font-semibold text-gray-300'>Phone</h5>
                <p className='text-[#FFFFFF] text-base sm:text-lg font-bold '>+01 123 654 8096</p>
            </div>


            </div>
            <div className='flex justify-start items-center gap-4 pt-8'>
            <div className='flex text-black bg-[#FEC447]  justify-center items-center p-6 '>
            <i class="fas fa-solid fa-phone text-[30px]"></i>
            
        </div>
            <div className='flex flex-col gap-2 justify-start items-start'>
                <h5 className='text-base uppercase font-semibold text-gray-300'>MAIL</h5>
                <p className='text-[#FFFFFF] text-base sm:text-lg font-bold '>info@domainname.com</p>
            </div>


            </div>
            <div className='flex justify-start items-center gap-4 pt-8'>
            <div className='flex text-black bg-[#FECCB5]  justify-center items-center  p-6  '>
            <i class="fas fa-map-marker-alt text-[30px]"></i>
            
        </div>
            <div className='flex flex-col gap-2 justify-start items-start'>
                <h5 className='text-base uppercase font-semibold text-gray-300'>Visit My Studio</h5>
                <p className='text-[#FFFFFF] text-sm sm:text-lg font-bold '>Warnwe Park Streetperrine,
                FL 33157 New York City</p>
            </div>


            </div>
            </div>
                
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
