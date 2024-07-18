import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentOverview = ({ student, setSelectedStudent }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`/achievements/${student._id}`);
        setAchievements(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setError('Failed to fetch achievements.');
        setLoading(false);
      }
    };

    if (student) {
      fetchAchievements();
    }
  }, [student]);

  const handleBack = () => {
    setSelectedStudent(null);
  };

  if (!student) {
    return <p className='text-center mt-4'>Select a student to view overview.</p>;
  }

  if (loading) {
    return <p className='text-center mt-4'>Loading achievements...</p>;
  }

  if (error) {
    return <p className='text-center mt-4'>{error}</p>;
  }

  return (
    <div className='bg-white rounded shadow p-4 mb-4'>
        <div className='flex justify-between items-start'>
      
      <div>
      <h2 className='text-xl font-bold mb-2'>{student.name}</h2>
      <div className='mb-2'>
        <span className='font-semibold'>Enrollment Number:</span> {student.enrollmentNumber || 'N/A'}
      </div>
      <div className='mb-2'>
        <span className='font-semibold'>Branch Section:</span> {student.branch_section || 'N/A'}
      </div>
      <div className='mb-2'>
        <span className='font-semibold'>Email:</span> {student.email || 'N/A'}
      </div>
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4'
        onClick={handleBack}
      >
        Back
      </button>
      </div>
      <h3 className='text-lg font-semibold mb-2'>Achievements</h3>
      <ul className='space-y-2'>
        {achievements.map(achievement => (
          <li key={achievement._id} className='p-2 bg-gray-100 rounded'>
            <h4 className='font-semibold'>{achievement.name}</h4>
            <p className='text-gray-600 mb-1'>{achievement.description}</p>
            <p className='text-gray-600 mb-1'>Location: {achievement.location}</p>
            <p className='text-gray-600 mb-1'>Date: {new Date(achievement.date).toLocaleDateString()}</p>
            <p className='text-gray-600 mb-1'>Mode: {achievement.mode}</p>
            <p className='text-gray-600 mb-1'>Result: {achievement.result}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentOverview;
