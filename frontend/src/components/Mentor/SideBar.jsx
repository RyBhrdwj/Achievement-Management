import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ onStudentSelect }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

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
    <div className="relative w-full h-full md:w-1/4 md:min-w-[230px]">
      {/* Mobile Menu Button */}
      <div className={`ml-4 md:hidden ${isSidebarOpen ? 'hidden' : ''}`}>
        <button onClick={() => setIsSidebarOpen(true)} className="flex items-center">
          <FontAwesomeIcon icon={faBars} className="text-black" />
          {!isSidebarOpen && <span className="ml-2 text-black">Students</span>}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-white shadow-xl rounded-lg p-6 flex flex-col h-full fixed top-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0 w-[50vw]' : '-translate-x-full'
        } z-50 md:static md:w-full`}
        style={{
          transform: isSidebarOpen ? 'translateX(0%)' : 'translateX(-100%)',
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 hidden md:block">Students</h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden flex items-center">
            <FontAwesomeIcon icon={faBars} className="text-black" />
            {isSidebarOpen && <span className="ml-2 text-black text-xl">Students</span>}
          </button>
        </div>
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
        <div className="overflow-y-auto h-[calc(100vh-180px)] custom-scrollbar">
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
      
      {/* Custom Scrollbar Styles */}
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






