import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai'; // Import search icon from react-icons
import Loader from '../Loader';

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllStudents = async () => {
      try {
        const response = await axios.get('/users');
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false); 
      }
    };
    getAllStudents();
  }, []);

  // Filter students based on the search query
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.trim().toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.enrollmentNumber.toLowerCase().includes(query) ||
      student.branch_section.toLowerCase().includes(query)
    );
  });

  // Sort filtered students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  return (
    <div className="bg-gray-200 p-4 md:p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">Student Details</h2>
      <div className="flex flex-col md:flex-row md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name, enrollment number, or branch section"
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="flex-shrink-0">
          <label htmlFor='sort-by' className="block text-sm font-medium text-gray-600 mb-2 ">
            Sort by:
          </label>
          <select
            id='sort-by'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm mb-7"
          >
            <option value='name'>Name</option>
            <option value='enrollmentNumber'>Enrollment Number</option>
            <option value='branch_section'>Branch Section</option>
          </select>
        </div>
      </div>
      {loading ? ( 
        <Loader content={'Fetching Students...'} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold text-black border-b border-gray-300">Name</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold text-black border-b border-gray-300">Enrollment Number</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold text-black border-b border-gray-300">Branch Section</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold text-black border-b border-gray-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr className="bg-white" key={student._id}>
                  <td className="p-2 md:p-3 text-xs md:text-sm text-gray-700 border-b border-gray-300">{student.name}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm text-gray-700 border-b border-gray-300">{student.enrollmentNumber}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm text-gray-700 border-b border-gray-300">{student.branch_section}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm text-gray-700 border-b border-gray-300">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;

