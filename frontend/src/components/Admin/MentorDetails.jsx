import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { AiOutlineSearch } from 'react-icons/ai'; // Import search icon from react-icons

const MentorDetails = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sorting by name
  const navigate = useNavigate();

  useEffect(() => {
    const getAllMentors = async () => {
      try {
        const response = await axios.get('/mentors');
        setMentors(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or if an error occurs
      }
    };
    getAllMentors();
  }, []);

  // Filter mentors based on search query
  const filteredMentors = mentors.filter((mentor) => {
    const query = searchQuery.toLowerCase();
    return (
      mentor.name.toLowerCase().includes(query) ||
      mentor.email.toLowerCase().includes(query) ||
      mentor.phone.toLowerCase().includes(query) ||
      mentor.department.toLowerCase().includes(query)
    );
  });

  // Sort filtered mentors
  const sortedMentors = [...filteredMentors].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  const handleMentorClick = (mentorId) => {
    navigate(`/mentor-details/${mentorId}`); // Navigate to mentor details page
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">Mentor Details</h2>
      
      <div className="flex items-center mb-4 space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xs py-2 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name, email, phone, or department"
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="flex-shrink-0">
          <label htmlFor='sort-by' className="block text-sm font-medium text-gray-600 mb-2">
            Sort by:
          </label>
          <select
            id='sort-by'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value='name'>Name</option>
            <option value='email'>Email</option>
            <option value='phone'>Phone</option>
            <option value='department'>Department</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <Loader /> // Show loader when loading
      ) : (
        sortedMentors.map((mentor) => (
          <div
            key={mentor._id}
            className="bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-50 transition-colors"
            onClick={() => handleMentorClick(mentor._id)}
          >
            <h3 className="text-xl font-semibold text-blue-900">{mentor.name}</h3>
            <p className="text-gray-700 mt-2">Email: {mentor.email}</p>
            <p className="text-gray-700 mt-1">Phone: {mentor.phone}</p>
            <p className="text-gray-700 mt-1">Department: {mentor.department}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MentorDetails;
