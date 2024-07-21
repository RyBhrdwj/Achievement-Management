import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader'; // Import your loader component

const StudentDetailsPage = () => {
  const { mentorId } = useParams(); // Get mentorId from URL parameters
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMentorDetails = async () => {
      try {
        const response = await axios.get(`/mentor/${mentorId}`);
        setMentor(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or if an error occurs
      }
    };
    getMentorDetails();
  }, [mentorId]);

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">Student Details</h2>
      {loading ? (
        <Loader /> // Show loader when loading
      ) : mentor ? (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-900">{mentor.name}</h3>
          <ul className="list-none pl-0">
            {mentor.studentUserIds?.map((student) => (
              <li key={student._id} className="p-4 bg-white rounded-lg shadow-md mb-4 border-l-4 border-blue-800">
                <div className="text-lg font-medium text-gray-800">{student.name}</div>
                <div className="text-sm text-gray-600 mt-1">Enrollment Number: {student.enrollmentNumber}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-700">No details available</p>
      )}
    </div>
  );
};

export default StudentDetailsPage;
