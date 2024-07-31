import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';
// import axios from 'axios';

function App() {
  const [userRole, setUserRole] = useState('admin');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserRole = async () => {
  //     try {
  //       const response = await axios.get('/api/user-role'); // Adjust the endpoint as needed
  //       setUserRole(response.data.role);
  //     } catch (error) {
  //       console.error('Error fetching user role:', error);
  //     }
  //   };

  //   fetchUserRole();
  // }, []);

  useEffect(() => {
    if (userRole) {
      if (userRole === 'student') {
        navigate('/');
      } else if (userRole === 'mentor') {
        navigate('/mentor');
      } else if (userRole === 'admin') {
        navigate('/admin');
      }
    }
  }, [userRole, navigate]);

  return (
    <div>
      <Header userRole={userRole} />
      {userRole ? <Outlet /> : <div>Loading...</div>}
    </div>
  );
}

export default App;
