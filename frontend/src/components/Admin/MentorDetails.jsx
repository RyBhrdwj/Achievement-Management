import React from 'react';

const dummyMentors = [
  {
    id: '1',
    name: 'Dr. John Doe',
    students: [
      { id: '1', name: 'Akshay Singh', enrollmentNumber: '03520801001' },
      { id: '2', name: 'Bobby Deol', enrollmentNumber: '03520801002' },
    ],
  },
  // Add more dummy mentors here
];

const MentorDetails = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Mentor Details</h2>
      {dummyMentors.map((mentor) => (
        <div key={mentor.id} style={styles.mentorSection}>
          <h3 style={styles.mentorName}>{mentor.name}</h3>
          <ul style={styles.studentList}>
            {mentor.students.map((student) => (
              <li key={student.id} style={styles.studentItem}>
                <div style={styles.studentName}>{student.name}</div>
                <div style={styles.enrollmentNumber}>Enrollment Number: {student.enrollmentNumber}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#C8C8C8',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#004080',
    borderBottom: '2px solid #cfd8dc',
    paddingBottom: '10px',
  },
  mentorSection: {
    marginBottom: '20px',
  },
  mentorName: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#003366',
  },
  studentList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  studentItem: {
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    borderLeft: '4px solid #004080',
  },
  studentName: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#002244',
  },
  enrollmentNumber: {
    fontSize: '14px',
    color: '#555555',
  },
};

export default MentorDetails;

