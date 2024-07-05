import React, { useState } from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#2C3E50',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    borderRadius: '8px 8px 0 0',
    bottom: '0',
    width: '100%',
    zIndex: 999,
    boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)',
  };

  const linkStyle = {
    color: '#ECF0F1',
    margin: '0 15px',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  };

  const linkHoverStyle = {
    color: '#1ABC9C',
  };

  const iconStyle = {
    color: '#ECF0F1',
    margin: '0 10px',
    fontSize: '24px',
    transition: 'color 0.3s ease',
  };

  const iconHoverStyle = {
    color: '#1ABC9C',
  };

  return (
    <div style={footerStyle}>
      <div>&copy; 2024 Student Profile. All rights reserved.</div>
      <div style={{ margin: '10px 0' }}>
        <a
          href="#contact"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)}
          onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
        >
          Contact Us
        </a>
        <a
          href="#about"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)}
          onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
        >
          About
        </a>
        <a
          href="#privacy"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)}
          onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
        >
          Privacy Policy
        </a>
      </div>
      <div style={{ margin: '10px 0' }}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={iconStyle}
          onMouseOver={(e) => (e.target.style.color = iconHoverStyle.color)}
          onMouseOut={(e) => (e.target.style.color = iconStyle.color)}
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={iconStyle}
          onMouseOver={(e) => (e.target.style.color = iconHoverStyle.color)}
          onMouseOut={(e) => (e.target.style.color = iconStyle.color)}
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={iconStyle}
          onMouseOver={(e) => (e.target.style.color = iconHoverStyle.color)}
          onMouseOut={(e) => (e.target.style.color = iconStyle.color)}
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
