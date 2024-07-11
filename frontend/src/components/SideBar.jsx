import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTh, FaCheckSquare, FaUserAlt, FaTasks, FaCommentAlt, FaFileInvoiceDollar, FaBars } from 'react-icons/fa';

const SideBar = () => {
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const getLinkClassNames = (index) => {
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
        <div className="text-white z-50 text-2xl font-bold mb-8 self-center">LOGO</div>
        <nav>
          <ul className="list-none p-0 w-full">
            <li className="mb-4">
              <NavLink
                to="/"
                className={getLinkClassNames(0)}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
                onClick={() => { if (window.innerWidth <= 768 && isOpen) toggleSidebar(); }}
              >
                <FaTh className="mr-3 " /> Dashboard
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/add"
                className={getLinkClassNames(1)}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
                onClick={() => { if (window.innerWidth <= 768 && isOpen) toggleSidebar(); }}
              >
                <FaCheckSquare className="mr-3" /> Add Event
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/notifications"
                className={getLinkClassNames(4)}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
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
