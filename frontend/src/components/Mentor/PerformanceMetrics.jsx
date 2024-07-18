import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PerformanceMetrics = ({ mentorId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`/mentor/${mentorId}/student`);
        const studentsWithMetrics = await Promise.all(
          response.data.studentUserIds.map(async student => {
            const achievementsResponse = await axios.get(`/achievements/${student._id}`);
            const eventsAttended = achievementsResponse.data.filter(
              achievement => achievement.verificationStatus === 'accepted'
            ).length;
            return {
              ...student,
              eventsAttended
            };
          })
        );

        // Sort students by eventsAttended in descending order
        studentsWithMetrics.sort((a, b) => b.eventsAttended - a.eventsAttended);

        setStudents(studentsWithMetrics);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Failed to fetch students.');
        setLoading(false);
      }
    };

    fetchStudents();
  }, [mentorId]);

  if (loading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='bg-white rounded shadow p-4 mb-4'>
      <h2 className='text-xl font-bold mb-4'>Performance Metrics</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Student Name
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Enrollment Number
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Events Attended
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {students.map(student => (
              <tr key={student._id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>{student.name}</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>{student.enrollmentNumber}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                    {student.eventsAttended || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
