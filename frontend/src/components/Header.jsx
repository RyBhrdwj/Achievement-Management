import React, { useEffect, useState } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const headerStyle = {
    position: 'relative',
    backgroundColor: '#2C3E50',
    color: 'black',
    padding: '20px',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'padding 0.5s ease-in-out',
  };

  const profilePicStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    margin: scrolled ? '0' : '10px auto',
    display: 'block',
    border: '4px solid white',
    position: scrolled ? 'fixed' : 'static',
    top: scrolled ? '10px' : 'auto',
    right: scrolled ? '20px' : 'auto',
    transition: 'all 0.5s ease-in-out',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const textContainerStyle = {
    position: scrolled ? 'fixed' : 'static',
    top: scrolled ? '10px' : 'auto',
    right: scrolled ? '110px' : 'auto',
    textAlign: scrolled ? 'right' : 'center',
    transition: 'all 0.5s ease-in-out',
    display: 'inline-block',
    padding: '10px',
  };

  const nameStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: scrolled ? '0' : '10px',
    color: scrolled ? '#333' : 'white',
    transition: 'color 0.5s ease-in-out, margin 0.5s ease-in-out',
  };

  const studentInfoStyle = {
    fontSize: '16px',
    marginTop: scrolled ? '0' : '5px',
    color: scrolled ? '#555' : 'white',
    transition: 'color 0.5s ease-in-out, margin 0.5s ease-in-out',
  };

  const logoStyle = {
    position: 'fixed',
    top: '10px',
    left: '20px',
    width: '100px',
    height: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.5s ease-in-out',
  };

  return (
    <div>
      <div style={headerStyle}>
        <img
          src='data:image/jpeg;base64,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'
          alt='Logo'
          style={logoStyle}
        />
        <img
          src='data:image/png;base64,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'
          alt='Profile'
          style={profilePicStyle}
        />
        <div style={textContainerStyle}>
          <div style={nameStyle}>Aditya Gaur</div>
          <div style={studentInfoStyle}>Computer Science Major</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
