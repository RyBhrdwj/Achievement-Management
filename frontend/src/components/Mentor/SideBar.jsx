import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SideBar = ({ onStudentSelect }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const mentorId = '6692351e76002fc8b2ab2b35';
        const response = await axios.get(`/mentor/${mentorId}/student`);
        if (response.data.studentUserIds) {
          setStudents(response.data.studentUserIds);
          setFilteredStudents(response.data.studentUserIds);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    setFilteredStudents(
      students.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.enrollmentNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, students]);

  return (
    <div className="bg-gray-100 shadow-xl rounded-lg p-6 flex flex-col h-full md:sticky top-0 md:w-1/4 w-50% md:min-w-[230px]">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Students</h2>
      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="overflow-y-auto h-[calc(100vh-180px)] md:h-auto">
        <ul className="space-y-2">
          {filteredStudents.map(student => (
            <li key={student._id}>
              <button
                onClick={() => onStudentSelect(student)}
                className="w-full p-3 bg-white rounded-lg shadow-sm hover:bg-blue-100 transition duration-200 ease-in-out flex flex-col items-start border border-gray-200"
              >
                <span className="text-md font-medium text-gray-800">{student.name || 'Unknown Name'}</span>
                <span className="text-sm text-gray-600">{student.enrollmentNumber || 'N/A'}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

