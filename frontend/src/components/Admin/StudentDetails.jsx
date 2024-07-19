import React, { useState } from 'react';

const dummyStudents = [
  { id: '1', name: 'Alice Smith', enrollmentNumber: '03520801001', branch_section: 'CSE A', email: 'alice@example.com' },
  { id: '2', name: 'Bob Johnson', enrollmentNumber: '03520801002', branch_section: 'CSE B', email: 'bob@example.com' },
  { id: '3', name: 'Nikhil Kumar', enrollmentNumber: '035', branch_section: 'CSE A', email: 'bob@example.com' },
  // Add more dummy students here
];

const StudentDetails = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [sortBy, setSortBy] = useState('name');

  const sortedStudents = [...students].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  return (
    <div className='bg-white rounded shadow p-4 mb-4'>
      <h2 className='text-xl font-bold mb-4'>Student Details</h2>
      <div className='mb-4'>
        <label htmlFor='sort-by' className='block text-sm font-medium text-gray-700 mb-2'>
          Sort by:
        </label>
        <select
          id='sort-by'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className='p-2 border border-gray-300 rounded'
        >
          <option value='name'>Name</option>
          <option value='enrollmentNumber'>Enrollment Number</option>
          <option value='branch_section'>Branch Section</option>
        </select>
      </div>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Enrollment Number</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Branch Section</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {sortedStudents.map((student) => (
            <tr key={student.id}>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{student.name}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{student.enrollmentNumber}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{student.branch_section}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
