import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import { Pagination } from '@mui/material';

const PerformanceMetrics = ({ mentorId }) => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
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

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-3 relative bg-blue-200 shadow-lg rounded-lg" style={{ height: '40vh', position: 'relative' }}>
      <h2 className="text-2xl font-semibold mb-4 text-center">Performance Metrics</h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-3 uppercase font-semibold text-xs text-left">Student Name</th>
              <th className="py-2 px-3 uppercase font-semibold text-xs text-left">Enrollment Number</th>
              <th className="py-2 px-3 uppercase font-semibold text-xs text-left">Events Attended</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentStudents.map(student => (
              <tr key={student._id} className="bg-gray-100 hover:bg-gray-200">
                <td className="py-2 px-3 text-xs">{student.name}</td>
                <td className="py-2 px-3 text-xs">{student.enrollmentNumber}</td>
                <td className="py-2 px-3 text-xs">
                  <span className="px-2 py-1 text-xs font-bold text-black bg-orange-400 rounded-full">
                    {student.eventsAttended || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-2 absolute bottom-2 left-1/2">
        <Pagination
          count={Math.ceil(students.length / studentsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size="small"
        />
      </div>
    </div>
  );
};

export default PerformanceMetrics;
