import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTh, FaCheckSquare, FaCommentAlt, FaBars } from 'react-icons/fa';

const SideBar = () => {
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [clickedIndex, setClickedIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Set the clicked index based on the current path
    const pathToIndex = {
      '/': 0,
      '/add': 1,
      '/notifications': 2,
    };
    setClickedIndex(pathToIndex[location.pathname]);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (index) => {
    setClickedIndex(index);
    if (window.innerWidth <= 768 && isOpen) toggleSidebar();
  };

  const getLinkClassNames = (index) => {
    if (clickedIndex === index) {
      return "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out bg-purple-900 text-white ";
    }
    return hovered === index
      ? "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out bg-purple-700 text-white"
      : "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out text-gray-200 hover:bg-purple-500 hover:text-white";
  };

  return (
    <>
      <FaBars
        className="fixed top-5 left-5 text-2xl cursor-pointer z-50 block md:hidden"
        onClick={toggleSidebar}
      />
      <div
        className={`fixed top-0 left-0 w-60 h-full bg-purple-500 p-3 flex flex-col items-start shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}
      >
        <div className="text-white z-50 text-2xl font-bold mb-8 ml-4">Sidebar</div>
        <nav>
          <ul className="list-none p-0 w-full">
            <li className="mb-4">
              <NavLink
                to="/"
                className={getLinkClassNames(0)}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(0)}
              >
                <FaTh className="mr-3" /> Dashboard
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/add"
                className={getLinkClassNames(1)}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(1)}
              >
                <FaCheckSquare className="mr-3" /> Add Event
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/notifications"
                className={getLinkClassNames(2)}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(2)}
              >
                <FaCommentAlt className="mr-3" /> Message
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideBar;


