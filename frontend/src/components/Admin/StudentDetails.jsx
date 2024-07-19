import React, { useState } from 'react';

const dummyStudents = [
  { id: '1', name: 'Anna ji', enrollmentNumber: '03520801001', branch_section: 'CSE A', email: 'alice@example.com' },
  { id: '2', name: 'Bunty', enrollmentNumber: '03520801002', branch_section: 'CSE B', email: 'bob@example.com' },
  { id: '3', name: 'Noor', enrollmentNumber: '035', branch_section: 'CSE A', email: 'bob@example.com' },
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
    <div style={{ backgroundColor: '#C8C8C8', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#000000' }}>Student Details</h2>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor='sort-by' style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', color: '#666', marginBottom: '8px' }}>
          Sort by:
        </label>
        <select
          id='sort-by'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{color:'#000000', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', maxWidth: '300px' }}
        >
          <option value='name'>Name</option>
          <option value='enrollmentNumber'>Enrollment Number</option>
          <option value='branch_section'>Branch Section</option>
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead style={{ backgroundColor: '#f9f9f9' }}>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold', color: '#000000', borderBottom: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold', color: '#000000', borderBottom: '1px solid #ddd' }}>Enrollment Number</th>
            <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold', color: '#000000', borderBottom: '1px solid #ddd' }}>Branch Section</th>
            <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: 'bold', color: '#000000', borderBottom: '1px solid #ddd' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr className='bg-white' key={student.id}>
              <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#333', borderBottom: '1px solid #ddd' }}>{student.name}</td>
              <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#333', borderBottom: '1px solid #ddd' }}>{student.enrollmentNumber}</td>
              <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#333', borderBottom: '1px solid #ddd' }}>{student.branch_section}</td>
              <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#333', borderBottom: '1px solid #ddd' }}>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
