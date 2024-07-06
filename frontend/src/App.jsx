import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Header from './components/Header';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className='grid grid-cols-12'>
      <div className='sm:col-span-2'><SideBar /></div>
      <div className='col-span-12 sm:col-span-10'>
        <Header />
        <Outlet /> {/* This will render the child routes */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;

