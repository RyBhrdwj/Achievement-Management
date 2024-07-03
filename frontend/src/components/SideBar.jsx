import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTh, FaCheckSquare, FaUserAlt, FaTasks, FaCommentAlt, FaFileInvoiceDollar, FaBars } from 'react-icons/fa';

const SideBar = () => {
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarStyle = {
    position: 'fixed',
    top: '0',
    left: isOpen ? '0' : '-250px',
    width: '250px',
    height: '100vh',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa',
    transition: 'left 0.3s ease',
  };

  const toggleButtonStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 1000,
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginLeft: '10px',
    marginTop: '25px',
    marginBottom: '20px',
    color: '#4b7bec',
  };

  const navStyle = {
    listStyleType: 'none',
    padding: '0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const navItemStyle = {
    marginBottom: '15px', // Adjusted for better spacing on smaller screens
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#808080',
    fontSize: '16px', // Reduced font size for smaller screens
    padding: '8px 12px', // Reduced padding for smaller screens
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const activeLinkStyle = {
    backgroundColor: '#e0e8ff',
    color: '#4b7bec',
  };

  const iconStyle = {
    marginRight: '8px', // Adjusted margin for better spacing on smaller screens
  };

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const getLinkStyle = (index) => {
    return hovered === index ? { ...linkStyle, ...activeLinkStyle } : linkStyle;
  };

  return (
    <>
      <FaBars style={toggleButtonStyle} onClick={toggleSidebar} />
      <div className="lg:w-64 md:w-56 sm:w-48" style={sidebarStyle}>
        <div style={logoStyle}>LOGO</div>
        <nav>
          <ul style={navStyle}>
            <li style={navItemStyle}>
              <NavLink
                to="/"
                style={getLinkStyle(0)}
                activeStyle={activeLinkStyle}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <FaTh style={iconStyle} /> Dashboard
              </NavLink>
            </li>
            <li style={navItemStyle}>
              <NavLink
                to="/add"
                style={getLinkStyle(1)}
                activeStyle={activeLinkStyle}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <FaCheckSquare style={iconStyle} /> Add Event
              </NavLink>
            </li>
            <li style={navItemStyle}>
              <NavLink
                to="/client"
                style={getLinkStyle(2)}
                activeStyle={activeLinkStyle}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <FaUserAlt style={iconStyle} /> My Client
              </NavLink>
            </li>
            <li style={navItemStyle}>
              <NavLink
                to="/task"
                style={getLinkStyle(3)}
                activeStyle={activeLinkStyle}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              >
                <FaTasks style={iconStyle} /> My Task
              </NavLink>
            </li>
            <li style={navItemStyle}>
              <NavLink
                to="/message"
                style={getLinkStyle(4)}
                activeStyle={activeLinkStyle}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              >
                <FaCommentAlt style={iconStyle} /> Message
              </NavLink>
            </li>
            <li style={navItemStyle}>
              <NavLink
                to="/billing"
                style={getLinkStyle(5)}
                activeStyle={activeLinkStyle}
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={handleMouseLeave}
              >
                <FaFileInvoiceDollar style={iconStyle} /> My Billing
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
