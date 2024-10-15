import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import Button from './Button';
import logo from "../assets/logo.png";
import icon from "../assets/arrow.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className=''>
      <nav className="fixed top-0 w-full bg-white py-4 px-2 md:px-8 shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div className="hidden lg:flex">
            <ul className="flex text-base font-medium list-none gap-7">
              <li className="flex items-center justify-between">
                <a href="#">Home</a>
              </li>
              <li className="flex items-center justify-between">
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">How it Works</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ul>
          </div>
          <div className="hidden lg:flex gap-5 items-center">
            <div className="flex items-center">
              {/* <IoIosSearch /> */}
            </div>
            <a
              href="#"
              target="_blank"
              className="text-[#0f172a] border-2 border-[#0f172a] hover:bg-[#0f172a] hover:text-white px-4 py-2 rounded-full  transition-colors duration-300"
            >
              Log In
            </a>
            <Button className="bg-[#0f172a] hover:text-[#0f172a] hover:bg-transparent border-2 border-[#0f172a] ">Get Started Now</Button>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-2xl">
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col gap-4 md:p-4">
              <div className="flex md:flex-row flex-col md:items-center gap-2">
                <div className="h-5 w-5 hidden md:block">
                  <IoIosSearch />
                </div>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-2 py-1 flex-grow"
                  placeholder="Search"
                />
                <Button className="bg-[#0f172a] hover:text-[#0f172a] hover:bg-transparent border-2 border-[#0f172a] whitespace-nowrap">
                  Get Started Now
                </Button>
              </div>
              <ul className="flex flex-col list-none gap-4">
                <li className="flex items-center justify-between">
                  <a href="#">Home</a>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">How it Works</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li className="flex flex-col gap-5 items-center sm:flex-row sm:gap-5">
                  <a href="#" target="_blank">
                    <span className="text-[#0f172a] hover:bg-[#0f172a] hover:text-white px-4 py-2 rounded-full transition-colors duration-300 border-2 border-[#0f172a]">
                      Log In
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
