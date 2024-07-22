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
    <div className="bg-green-200 p-8 rounded-xl shadow-lg mb-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-gray-300 pb-2">Student Details</h2>
      {loading ? (
        <Loader /> // Show loader when loading
      ) : mentor ? (
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">{mentor.name}</h3>
          <ul className="list-none pl-0">
            {mentor.studentUserIds?.map((student) => (
              <li key={student._id} className="p-6 bg-white rounded-lg shadow-md mb-4 border-l-4 border-gray-800">
                <div className="text-lg font-medium text-gray-900">{student.name}</div>
                <div className="text-sm text-gray-600 mt-1">Enrollment Number: {student.enrollmentNumber}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600">No details available</p>
      )}
    </div>
  );
};

export default StudentDetailsPage;
