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
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col h-full sticky top-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Students</h2>
      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="overflow-y-auto h-96">
        <ul className="space-y-3">
          {filteredStudents.map(student => (
            <li key={student._id}>
              <button
                onClick={() => onStudentSelect(student)}
                className="w-full p-4 bg-gray-400 rounded-lg shadow-md hover:bg-green-200 transition duration-300 ease-in-out flex flex-col items-start"
              >
                <span className="text-lg font-semibold text-black">{student.name || 'Unknown Name'}</span>
                <span className="text-sm text-black">{student.enrollmentNumber || 'N/A'}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
