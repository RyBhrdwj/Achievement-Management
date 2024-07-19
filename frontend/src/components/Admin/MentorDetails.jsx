import React from 'react';

const dummyMentors = [
  {
    id: '1',
    name: 'Dr. John Doe',
    students: [
      { id: '1', name: 'Alice Smith', enrollmentNumber: '03520801001' },
      { id: '2', name: 'Bob Johnson', enrollmentNumber: '03520801002' },
    ],
  },
  // Add more dummy mentors here
];

const MentorDetails = () => {
  return (
    <div className='bg-white rounded shadow p-4 mb-4'>
      <h2 className='text-xl font-bold mb-4'>Mentor Details</h2>
      {dummyMentors.map((mentor) => (
        <div key={mentor.id} className='mb-6'>
          <h3 className='text-lg font-semibold mb-2'>{mentor.name}</h3>
          <ul className='space-y-2'>
            {mentor.students.map((student) => (
              <li key={student.id} className='p-4 bg-gray-100 rounded shadow'>
                <div className='text-sm font-medium text-gray-900'>{student.name}</div>
                <div className='text-sm text-gray-600'>Enrollment Number: {student.enrollmentNumber}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MentorDetails;
