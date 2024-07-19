import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Home, AddDetails, Mentor,AdminPortal } from './pages';
import Notification from './pages/Notification'; // Import Notification component
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URI

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='add' element={<AddDetails />} />
      <Route path='mentor' element={<Mentor />} />
      <Route path='notifications' element={<Notification />} />
      <Route path='admin' element={<AdminPortal />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
