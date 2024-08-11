import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import UserProvider from './context/UserContext';
// import axios from 'axios';

function App() {
  
  

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

  return (
    <UserProvider>
      <Header />
      <Outlet />
    </UserProvider>
  );
}

export default App;
