import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { HiMenu, HiX } from 'react-icons/hi';
import Button from './Button';
import logo from '../assets/logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="fixed top-0 w-full bg-white py-4 px-2 md:px-8 shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <img className="h-14 w-full" src={logo} alt="logo" />
          </div>
          <div className="hidden lg:flex">
            <ul className="flex text-base font-medium list-none gap-7">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
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
            <Link
              to="/login"
              className="text-[#0f172a] border-2 border-[#0f172a] hover:bg-[#0f172a] hover:text-white px-4 py-2 rounded-full transition-colors duration-300"
            >
              Log In
            </Link>
            <button 
              onClick={() => navigate('/registration')} // Navigate to Registration page
              className="bg-[#0f172a] text-white hover:text-[#0f172a] hover:bg-transparent border-2 border-[#0f172a] px-4 py-2 rounded-full transition-colors duration-300"
            >
              Get Started Now
            </button>
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
              <button 
                onClick={() => navigate('/registration')} // Navigate to Registration page
                className="bg-[#0f172a] hover:text-[#0f172a] hover:bg-transparent border-2 border-[#0f172a] px-4 py-2 rounded-full transition-colors duration-300 "
              >
                Get Started Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
