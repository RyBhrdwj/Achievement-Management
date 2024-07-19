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
    <div style={{
      background: 'linear-gradient(135deg, #f6d365 0%, #FF0000 100%)',
      borderRadius: '15px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
      padding: '20px',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      maxWidth: '400px',
      margin: 'auto'
    }}>
      <h2 className='text-black'style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        borderBottom: '2px solid #fff',
        paddingBottom: '10px'
      }}>🎉 Recent Winner 🎉</h2>
      <div style={{ marginBottom: '20px' }}>
        <p className='text-black'style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '5px'
        }}>Student Name:</p>
        <p style={{
          fontSize: '20px',
          fontWeight: '700'
        }}>{student.name}</p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p className='text-black' style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '5px'
        }}>Branch Section:</p>
        <p style={{
          fontSize: '20px',
          fontWeight: '700'
        }}>{student.branch_section}</p>
      </div>
      <div>
        <p className='text-black' style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '5px'
        }}>Achievement:</p>
        <p style={{
          fontSize: '20px',
          fontWeight: '700'
        }}>{achievement.name}</p>
        <p style={{
          fontSize: '16px',
          fontWeight: '500'
        }}>- - - {achievement.description} - - -</p>
        <br/>
        <p className='text-black' style={{
          fontSize: '16px',
          fontWeight: '500'
        }}>Date:{new Date(achievement.date).toLocaleDateString()}</p>
        
        <p className='text-black' style={{
          fontSize: '16px',
          fontWeight: '500'
        }}>Location: {achievement.location}</p>
      </div>
    </div>
  );
};

export default RecentWinnerDetails;

