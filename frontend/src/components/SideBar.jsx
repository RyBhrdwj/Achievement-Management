import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTh, FaCheckSquare, FaCommentAlt } from 'react-icons/fa';

const SideBar = () => {
  const [hovered, setHovered] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const location = useLocation();

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

  const getLinkClassNames = (index) => {
    if (clickedIndex === index) {
      return "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out bg-indigo-700 text-white";
    }
    return hovered === index
      ? "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out bg-indigo-600 text-white"
      : "flex items-center text-lg p-3 rounded-md transition duration-300 ease-in-out text-gray-200 hover:bg-indigo-500 hover:text-white";
  };

  return (
    <nav className="flex space-x-4">
      <ul className="list-none p-0 flex flex-row space-x-4">
        <li>
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
        <li>
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
        <li>
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
  );
};

export default SideBar;

