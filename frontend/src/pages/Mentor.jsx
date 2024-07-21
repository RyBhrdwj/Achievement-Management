import React, { useState } from 'react';
import Requests from '../components/Mentor/Requests';
import DownloadButton from '../components/DownloadButton';
import SideBar from '../components/Mentor/SideBar';
import StudentOverview from '../components/Mentor/StudentOverview';
import PerformanceMetrics from '../components/Mentor/PerformanceMetrics';

const Mentor = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2'>
        <SideBar onStudentSelect={handleStudentSelect} />
      </div>
      <div className='col-span-10 p-4'>
        {!selectedStudent ? (
          <>
            <DownloadButton mentor={true} />
            <PerformanceMetrics mentorId={'6692351e76002fc8b2ab2b35'} />
            <Requests mentorId={'6692351e76002fc8b2ab2b35'} />
          </>
        ) : (
          <StudentOverview student={selectedStudent} setSelectedStudent={setSelectedStudent} />
        )}
      </div>
    </div>
  );
};

export default Mentor;
