import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader';

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
    return <Loader content={'Fetching Student Details...'} />;
  }

  if (error) {
    return <p className='text-center mt-4'>{error}</p>;
  }

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h2 className='text-2xl font-bold mb-2 text-gray-800'>{student.name}</h2>
          <div className='mb-2'>
            <span className='font-semibold text-gray-600'>Enrollment Number:</span> {student.enrollmentNumber || 'N/A'}
          </div>
          <div className='mb-2'>
            <span className='font-semibold text-gray-600'>Branch Section:</span> {student.branch_section || 'N/A'}
          </div>
          <div className='mb-2'>
            <span className='font-semibold text-gray-600'>Email:</span> {student.email || 'N/A'}
          </div>
        </div>
        <button
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300'
          onClick={handleBack}
        >
          Back
        </button>
      </div>
      <h3 className='text-xl font-semibold mb-4 text-gray-700'>Achievements</h3>
      <ul className='space-y-4'>
        {achievements.map(achievement => (
          <li key={achievement._id} className='p-4 bg-gray-50 rounded-lg shadow-md'>
            <h4 className='text-lg font-semibold text-gray-800'>{achievement.name}</h4>
            <p className='text-gray-600 mt-1'>{achievement.description}</p>
            <div className='text-gray-600 mt-2'>
              <p><span className='font-semibold'>Organised by:</span> {achievement.location}</p>
              <p><span className='font-semibold'>Date:</span> {new Date(achievement.date).toLocaleDateString()}</p>
              <p><span className='font-semibold'>Mode:</span> {achievement.mode}</p>
              <p><span className='font-semibold'>Result:</span> {achievement.result}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentOverview;
