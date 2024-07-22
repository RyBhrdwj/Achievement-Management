import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { FaTh, FaCheckSquare, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const pathToIndex = {
      '/': 0,
      '/add': 1,
      '/notifications': 2,
    };
    setClickedIndex(pathToIndex[location.pathname]);
  }, [location]);

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);
  const handleClick = (index) => setClickedIndex(index);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle clicks outside of the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getLinkClassNames = (index) => {
    if (clickedIndex === index) {
      return "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out bg-blue-900 text-white";
    }
    return hovered === index
      ? "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out bg-indigo-600 text-white"
      : "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out text-gray-200 hover:bg-indigo-500 hover:text-white";
  };

  return (
    <>
      <header className='bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg p-4 flex flex-row justify-between items-center'>
        <div className='flex items-center mb-4 sm:mb-0'>
          <h1 className='text-md sm:text-2xl font-bold text-white'>Event Management</h1>
        </div>
        <nav className='hidden sm:flex flex-col sm:flex-row items-center gap-4'>
          <NavLink
            to="/"
            className={getLinkClassNames(0)}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(0)}
          >
            <FaTh className="mr-3" /> Dashboard
          </NavLink>
          <NavLink
            to="/add"
            className={getLinkClassNames(1)}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(1)}
          >
            <FaCheckSquare className="mr-3" /> Add Event
          </NavLink>
          <NavLink
            to="/notifications"
            className="inline-block"
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(2)}
          >
            <NotificationsIcon className='text-white w-10 h-10 cursor-pointer' />
          </NavLink>
          <div className='flex items-center bg-white p-2 rounded-full shadow-md'>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgyb9CNs-MYH7mqsI7pPYZ2tCwql4ldvw7OA&s"
              alt="Profile"
              className='w-10 h-10 rounded-full mr-4'
            />
            <div className='flex flex-col'>
              <span className='text-sm font-semibold text-gray-800'>Aditya Gaur</span>
              <span className='text-xs text-gray-500'>CSE-A</span>
            </div>
            <i className='fas fa-caret-down text-gray-600 text-sm ml-2'></i>
          </div>
        </nav>
        <button 
          className='sm:hidden text-white text-2xl' 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full bg-gray-800 bg-opacity-80 flex flex-col justify-between z-50 transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} w-64 p-4`}
      >
        <button 
          className="absolute top-4 right-4 text-white text-2xl" 
          onClick={toggleMenu}
        >
          <FaTimes />
        </button>
        <nav className='flex flex-col items-center gap-4'>
        <div className='flex items-center bg-white p-2 rounded-full shadow-md mt-4'>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgyb9CNs-MYH7mqsI7pPYZ2tCwql4ldvw7OA&s"
              alt="Profile"
              className='w-10 h-10 rounded-full mr-4'
            />
            <div className='flex flex-col'>
              <span className='text-sm font-semibold text-gray-800'>Aditya Gaur</span>
              <span className='text-xs text-gray-500'>CSE-A</span>
            </div>
          </div>
          <NavLink
            to="/"
            className="text-white text-lg py-3 px-4 rounded-md bg-blue-900 w-full text-center"
            onClick={() => {
              handleClick(0);
              toggleMenu();
            }}
          >
            <FaTh className="inline mr-2" /> Dashboard
          </NavLink>
          <NavLink
            to="/add"
            className="text-white text-lg py-3 px-4 rounded-md bg-indigo-600 w-full text-center"
            onClick={() => {
              handleClick(1);
              toggleMenu();
            }}
          >
            <FaCheckSquare className="inline mr-2" /> Add Event
          </NavLink>
          
        </nav>
      </div>
    </>
  );
};

export default Header;
