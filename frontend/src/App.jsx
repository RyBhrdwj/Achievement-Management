import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Header from './components/Header';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      {/* <div className='grid grid-cols-12 gap-4'> */}
     {/* <div className='col-span-2'><SideBar /></div>*/}
      {/* <div className='col-span-10'> */}
        <Outlet /> {/* This will render the child routes */}
        {/* <Footer /> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}

export default App;

