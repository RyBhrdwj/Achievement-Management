import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet from React Router
import Header from './components/Header';
import SideBar from './components/SideBar'; // Import SideBar component
import Footer from './components/Footer';


function App() {
  return (
    <>
      <Header />
     <div className='grid grid-cols-12'>
      <div className='col-span-2'><SideBar /></div>
      <div className='col-span-10'><Outlet /></div>
      
      
     </div>
      <Footer />
    </>
  );
}

export default App;

