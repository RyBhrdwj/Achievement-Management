import { BorderColor } from '@mui/icons-material';
import React from 'react';

const Header = () => {
  const headerStyle = {
    fontSize:"10px",
    fontWeight: 'bold', // Increase font weight
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: 10,
  };

  const headerLeftStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const titleStyle = {
    marginRight: '20px',
    fontSize: '24px',
    color: '#2E3A59',
  };



  const headerRightStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const bellIconStyle = {
    marginRight: '20px',
    fontSize: '20px',
    color: '#2E3A59',
  };

  const profileStyle = {
   
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: '8px 12px',
    borderRadius: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const profileImgStyle = {
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    marginRight: '10px',
  };

  const profileInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '10px',
  };

  const profileNameStyle = {
    fontSize: '14px',
    color: '#2E3A59',
  };

  const profileRoleStyle = {
    fontSize: '12px',
    color: '#8A95A1',
  };

  const dropdownIconStyle = {
    fontSize: '12px',
    color: '#2E3A59',
  };

  return (
    <header style={headerStyle} className='bg-sky-300 shadow-lg'>
      <div style={headerLeftStyle}>
        <h1 style={titleStyle}>Dashboard</h1>
        
      </div>
      <div style={headerRightStyle}>
        <div>
          <i className="fas fa-bell" style={bellIconStyle}></i>
        </div>
        <div style={profileStyle}>
          <img src="data:image/png;base64,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" alt="Profile" style={profileImgStyle} />
          <div style={profileInfoStyle}>
            <span style={profileNameStyle}>Aditya Gaur</span>
            <span style={profileRoleStyle}>CSE-A</span>
          </div>
          <div>
            <i className="fas fa-caret-down" style={dropdownIconStyle}></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

