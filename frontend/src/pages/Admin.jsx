import React from 'react';
import { ClassActivenessChart,StudentDetails,MentorDetails, RecentWinnerDetails } from '../components/Admin';

const AdminPortal = () => {
    return (
      <div className='p-6'>
        <h1 className='text-2xl font-bold mb-6'>Admin Portal</h1>
        
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='flex-1'>
            <ClassActivenessChart />
          </div>
          
          <div className='flex-2'>
            <RecentWinnerDetails />
          </div>
        </div>
  
        <div className='mt-8'>
          <StudentDetails />
        </div>
        <div className='mt-8'>
          <MentorDetails />
        </div>
      </div>
    );
  };

export default AdminPortal;
