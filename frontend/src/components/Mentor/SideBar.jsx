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
    <div className='bg-gray-100 p-4 flex flex-col h-full sticky top-0'>
      <h2 className='text-xl font-bold mb-4'>Students</h2>
      <input
        type='text'
        placeholder='Search students...'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className='w-full p-2 mb-4 border border-gray-300 rounded'
      />
      <div className='overflow-y-auto h-96'>
        <ul className='space-y-2'>
          {filteredStudents.map(student => (
            <li key={student._id} className=''>
              <button
                onClick={() => onStudentSelect(student)}
                className='w-full p-2 bg-white rounded shadow flex flex-col text-left'
              >
                <span className='text-lg font-semibold'>{student.name || 'Unknown Name'}</span>
                <span className='text-sm text-gray-500'>{student.enrollmentNumber || 'N/A'}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
