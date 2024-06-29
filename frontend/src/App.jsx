import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet from React Router
import Header from './components/Header';
import SideBar from './components/SideBar'; // Import SideBar component
import Footer from './components/Footer';


function App() {
  return (
    <>
      <Header />
      <SideBar /> {/* Include the SideBar component here */}
      <div className="content">
        <Outlet /> {/* Render nested routes/components here */}
      </div>
      <Footer />
    </>
  );
}

export default App;

