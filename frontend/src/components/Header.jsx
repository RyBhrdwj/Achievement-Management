import React from 'react';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
  return (
    <header className='bg-sky-300 shadow-lg p-4 sm:rounded-lg flex justify-between items-center ml-4 mt-0 '>
      <div className='flex items-center'>
        <h1 className='text-md sm:text-2xl font-bold text-gray-800'></h1>
      </div>
      <div className='flex items-center '>
        <Link to="/notifications">
          <NotificationsIcon className='text-white  mr-7 w-40  h-40 cursor-pointer' />
        </Link>
        <div className='flex items-center bg-white p-4 rounded-full shadow'>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgyb9CNs-MYH7mqsI7pPYZ2tCwql4ldvw7OA&s"
            alt="Profile"
            className='w-10 h-10 rounded-full mr-4'
          />
          <div className='flex flex-col mr-2'>
            <span className='text-sm font-semibold text-gray-800'>Aditya Gaur</span>
            <span className='text-xs text-gray-500'>CSE-A</span>
          </div>
          <i className='fas fa-caret-down text-gray-600 text-sm'></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
