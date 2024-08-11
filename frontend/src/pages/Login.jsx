import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Paper from '@mui/material/Paper';

const Login = () => {
    const { userRole, setUserRole } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (userRole) {
          if (userRole === 'student') {
            navigate('/student');
          } else if (userRole === 'mentor') {
            navigate('/mentor');
          } else if (userRole === 'admin') {
            navigate('/admin');
          }
        }
      }, [userRole, navigate]);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-10 text-center">Login</h1>
        <div className="flex flex-col space-y-8">
          <button
            onClick={() => setUserRole('student')}
            className="flex items-center justify-center w-full px-10 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            <SchoolIcon className="mr-3" />
            Login as Student
          </button>
          <button
            onClick={() => setUserRole('mentor')}
            className="flex items-center justify-center w-full px-10 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg"
          >
            <PersonIcon className="mr-3" />
            Login as Mentor
          </button>
          <button
            onClick={() => setUserRole('admin')}
            className="flex items-center justify-center w-full px-10 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg"
          >
            <AdminPanelSettingsIcon className="mr-3" />
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
