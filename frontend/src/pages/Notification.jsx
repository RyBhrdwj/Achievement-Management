import axios from "axios";
import React, { useState, useEffect } from "react";
import { formatDate } from '../utililtyFunctions.js';
import Loader from '../components/Loader.jsx';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const Card = ({ notification }) => {
  return (
    <div
      key={notification.id}
      className="flex items-start p-4 mb-2 mt-2 bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-6xl mx-auto" 
    >
      <div className="flex-shrink-0">
        <NotificationImportantIcon color="primary"  />
      </div>
      <div className="ml-4">
        <div className="text-lg font-medium text-gray-900">
          {notification.title}
        </div>
        <div className="text-gray-600">{notification.message}</div>
        <div className="text-sm text-gray-400 mt-2">{formatDate(notification.createdAt)}</div>
      </div>
    </div>
  );
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNotifications = async () => {
      setLoading(true);
      const userId = '6692353576002fc8b2ab2b37';
      try {
        const response = await axios.get(`/notifications/${userId}`);
        const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotifications(sortedNotifications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getNotifications();
  }, []);

  return (
    <div className="min-h-screen my-4  bg-gray-100 mx-auto max-w-5xl" >
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4">
          <h1 className="text-white text-2xl font-semibold text-center">
            Notifications
          </h1>
        </div>
        {loading ? (
          <Loader content={'Fetching Notifications...'} />
        ) : (
          <div className="px-10 py-4">
            {notifications.length > 0 ? (
              notifications.map((notification, idx) => (
                <Card key={idx} notification={notification} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <img src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg?size=626&ext=jpg&ga=GA1.1.151194107.1711096925&semt=ais_user" alt="No notifications" className="w-60 h-60 m-4" />
                <p className="text-gray-600 text-2xl">You have no notifications !!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
