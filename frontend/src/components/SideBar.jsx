import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const SideBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const sidebarStyle = {
    position: 'relative',
    bottom:"2000px", // Assuming header height is 80px
    width: '250px',
    backgroundColor: '#0DBDED',
    color: 'white',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)',
    overflowY: 'auto',
    transition: 'all 0.3s ease',
  };

  const headerStyle = {
    padding: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0984a6',
    marginBottom: '20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  };

  const itemStyle = {
    padding: '15px 20px',
    transition: 'background-color 0.3s ease, padding-left 0.3s ease, color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer', // Add a pointer cursor
  };

  const hoverStyles = {
    home: { backgroundColor: '#0a39f5', color: 'white' },
    profile: { backgroundColor: '#0a39f5', color: 'white' },
    settings: { backgroundColor: '#0a39f5', color: 'white' },
    logout: { backgroundColor: '#f50a0a', color: 'white' },
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    marginLeft: '10px',
    flex: 1,
    display: 'block',
  };

  return (
    <div style={sidebarStyle}>
      <div style={headerStyle}>Menu</div>
      <ul style={listStyle}>
        <li
          style={{ ...itemStyle, ...(hoveredItem === 'home' && hoverStyles.home) }}
          onMouseEnter={() => setHoveredItem('home')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <FaHome size={20} />
          <a href="#home" style={linkStyle}>Home</a>
        </li>
        <li
          style={{ ...itemStyle, ...(hoveredItem === 'profile' && hoverStyles.profile) }}
          onMouseEnter={() => setHoveredItem('profile')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <FaUser size={20} />
          <a href="#profile" style={linkStyle}>Profile</a>
        </li>
        <li
          style={{ ...itemStyle, ...(hoveredItem === 'settings' && hoverStyles.settings) }}
          onMouseEnter={() => setHoveredItem('settings')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <FaCog size={20} />
          <a href="#settings" style={linkStyle}>Settings</a>
        </li>
        <li
          style={{ ...itemStyle, marginTop: 'auto', ...(hoveredItem === 'logout' && hoverStyles.logout) }}
          onMouseEnter={() => setHoveredItem('logout')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <FaSignOutAlt size={20} />
          <a href="#logout" style={linkStyle}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
