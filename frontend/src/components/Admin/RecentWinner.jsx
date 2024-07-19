import React from 'react';

const dummyRecentWinner = {
  student: {
    name: 'Nikhil Kumar',
    branch_section: 'CSE A',
  },
  achievement: {
    name: 'hackhazard',
    description: 'hackathon',
    location: 'bpit',
    date: '2024-03-14T00:00:00.000Z',
  },
};

const RecentWinnerDetails = () => {
  const { student, achievement } = dummyRecentWinner;

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-xl font-bold mb-4'>Recent Winner Details</h2>
      <div className='mb-4'>
        <p className='text-sm font-semibold'>Student Name:</p>
        <p className='text-lg'>{student.name}</p>
      </div>
      <div className='mb-4'>
        <p className='text-sm font-semibold'>Branch Section:</p>
        <p className='text-lg'>{student.branch_section}</p>
      </div>
      <div>
        <p className='text-md font-medium'>
          Won <span className='font-semibold'>{achievement.name} </span> 
          {achievement.description} on <span className='font-semibold'>{new Date(achievement.date).toLocaleDateString()} </span> 
          organised by <span className='font-semibold'>{achievement.location}</span>
        </p>
      </div>
    </div>
  );
};

export default RecentWinnerDetails;
