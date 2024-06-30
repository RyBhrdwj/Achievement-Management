import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTh, FaCheckSquare, FaUserAlt, FaTasks, FaCommentAlt, FaFileInvoiceDollar } from 'react-icons/fa';

const SideBar = () => {
  const [hovered, setHovered] = useState(null);

  const sidebarStyle = {
    position: 'fixed', // Keep the sidebar fixed
    top: '1px',      // Adjust as needed to position it correctly from the top
    left: '0',         // Align it to the left of the viewport
    width: '250px',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    height: '97vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: 10,
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#4b7bec'
  };

  const navStyle = {
    listStyleType: 'none',
    padding: '0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const navItemStyle = {
    marginBottom: '20px'
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#808080',
    fontSize: '18px',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s'
  };

  const activeLinkStyle = {
    backgroundColor: '#e0e8ff',
    color: '#4b7bec',
  };

  const iconStyle = {
    marginRight: '10px'
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
    <div style={sidebarStyle} className='bg-gray-200'>
      <div style={logoStyle}>LOGO</div>
      <nav>
        <ul style={navStyle}>
          <li style={navItemStyle}>
            <NavLink to="/" style={getLinkStyle(0)} activeStyle={activeLinkStyle}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}>
              <FaTh style={iconStyle} /> Dashboard
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/add" style={getLinkStyle(1)} activeStyle={activeLinkStyle}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}>
              <FaCheckSquare style={iconStyle} /> Add Event
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/client" style={getLinkStyle(2)} activeStyle={activeLinkStyle}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}>
              <FaUserAlt style={iconStyle} /> My Client
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/task" style={getLinkStyle(3)} activeStyle={activeLinkStyle}
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}>
              <FaTasks style={iconStyle} /> My Task
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/message" style={getLinkStyle(4)} activeStyle={activeLinkStyle}
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}>
              <FaCommentAlt style={iconStyle} /> Message
            </NavLink>
          </li>
          <li style={navItemStyle}>
            <NavLink to="/billing" style={getLinkStyle(5)} activeStyle={activeLinkStyle}
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}>
              <FaFileInvoiceDollar style={iconStyle} /> My Billing
            </NavLink>
          </li>
        </ul>
      </nav>
      
      
    </div>
  );
};

export default SideBar;
