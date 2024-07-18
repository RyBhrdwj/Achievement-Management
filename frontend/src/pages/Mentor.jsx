import React, { useState, useEffect } from 'react';
import Requests from '../components/Mentor/Requests';
import axios from 'axios';
import DownloadButton from '../components/DownloadButton';
import SideBar from '../components/Mentor/SideBar';
// import Notifications from '../components/Mentor/Notifications';
import StudentOverview from '../components/Mentor/StudentOverview';
import PerformanceMetrics from '../components/Mentor/PerformanceMetrics';

const Mentor = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    getRequests();
  }, []);
  const mentorId = '6692351e76002fc8b2ab2b35';
  const getRequests = async () => {
    try {
      
      const response = await axios.get(`/requests/${mentorId}`);
      if (response.data) {
        setRequests(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError('Failed to load requests.');
      setLoading(false);
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    // Additional logic to render the student dashboard can be added here
  };

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2'>
        <SideBar onStudentSelect={handleStudentSelect} />
      </div>
      <div className='col-span-10 p-4'>
        {!selectedStudent ? <>
        <DownloadButton mentor={true} />
        <PerformanceMetrics mentorId={mentorId} />
        {loading ? (
          <p>Loading requests...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Requests requests={requests} getRequests={getRequests} />
        )}
        </> : 
        <StudentOverview student={selectedStudent} setSelectedStudent={setSelectedStudent}/> }
        
      </div>
    </div>
  );
};

export default Mentor;
