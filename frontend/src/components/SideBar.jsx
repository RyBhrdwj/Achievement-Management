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

  const sidebarStyle = {
    position: 'fixed',
    top: '0',
    left: isOpen ? '0' : '-250px',
    width: '230px',
    height: '100vh',
    backgroundColor: '#ab3e97',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'left 0.3s ease, width 0.3s ease',
    zIndex: 1000,
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
  };

  const toggleButtonStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 1001,
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#fff',
    alignSelf: 'center',
    marginTop: '28px',
    marginRight: '40px',
  };

  const navStyle = {
    listStyleType: 'none',
    padding: '0',
    width: '100%',
  };

  const navItemStyle = {
    marginBottom: '20px',
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '18px',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const activeLinkStyle = {
    backgroundColor: '#34495e',
  };

  const iconStyle = {
    marginRight: '10px',
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
      <div style={sidebarStyle}>
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
                onClick={() => { if (isOpen) toggleSidebar(); }}
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
                onClick={() => { if (isOpen) toggleSidebar(); }}
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






