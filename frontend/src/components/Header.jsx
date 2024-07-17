import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { FaTh, FaCheckSquare } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State to manage notification visibility

  useEffect(() => {
    // Set the clicked index based on the current path
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

  const getLinkClassNames = (index) => {
    if (clickedIndex === index) {
      return "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out bg-blue-900  text-white";
    }
    return hovered === index
      ? "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out bg-indigo-600 text-white"
      : "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out text-gray-200 hover:bg-indigo-500 hover:text-white";
  };

  return (
    <header className='bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg p-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <h1 className='text-md sm:text-2xl font-bold ml-10 text-white'>Event Management</h1>
      </div>
      <nav className='flex items-center ml-10 gap-4'>
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

        {/* NavLink for Notification */}
        <NavLink
          to="/notifications"
          className="inline-block mr-6"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(2)}
        >
          <NotificationsIcon className='text-white w-10 h-10 cursor-pointer' />
        </NavLink>

        {/* Profile section */}
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
    </header>
  );
};

export default Header;

