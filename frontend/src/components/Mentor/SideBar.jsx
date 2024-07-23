import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ onStudentSelect }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="relative md:w-1/4 w-full md:min-w-[320px]">
      <div className="md:hidden flex   p-3 bg-black shadow-xl ">
        <h2 className=" font-semibold text-white mr-1 ">Students</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FontAwesomeIcon icon={faBars} className="text-white" />
        </button>
      </div>
      <div
        className={`bg-white shadow-2xl rounded-lg p-6 flex flex-col h-full md:sticky top-0 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 hidden md:block">Students</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="overflow-y-auto h-[calc(100vh-180px)] md:h-auto custom-scrollbar">
          <ul className="space-y-3">
            {filteredStudents.map(student => (
              <li key={student._id}>
                <button
                  onClick={() => onStudentSelect(student)}
                  className="w-full p-4 bg-white rounded-lg shadow-md hover:bg-blue-50 transition duration-200 ease-in-out flex flex-col items-start border border-gray-200"
                >
                  <span className="text-lg font-medium text-gray-800">{student.name || 'Unknown Name'}</span>
                  <span className="text-sm text-gray-600">{student.enrollmentNumber || 'N/A'}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default SideBar;


