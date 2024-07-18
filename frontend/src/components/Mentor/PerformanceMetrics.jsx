import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

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
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
        <p className="ml-2 text-lg">Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-3 bg-blue-200 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-3 text-center">Performance Metrics</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm text-left text-under">Student Name</th>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm text-left">Enrollment Number</th>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm text-left">Events Attended</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.map(student => (
              <tr key={student._id} className="bg-gray-100 hover:bg-gray-200">
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.enrollmentNumber}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-bold text-black bg-orange-400 rounded-full">
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
