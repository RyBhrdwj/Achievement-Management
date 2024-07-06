import React from 'react';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: 'New Assignment',
      message: 'You have a new assignment due next week.',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Meeting Reminder',
      message: 'Reminder for your meeting with the mentor tomorrow at 10 AM.',
      time: '1 day ago'
    },
    {
      id: 3,
      title: 'Feedback Received',
      message: 'Your mentor has provided feedback on your recent project.',
      time: '3 days ago'
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4">
          <h1 className="text-white text-2xl font-semibold text-center">Notifications</h1>
        </div>
        <div className="p-4">
          {notifications.map(notification => (
            <div key={notification.id} className="flex items-start p-4 mb-4 bg-white rounded-lg shadow-md border border-gray-200">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 00-8 8v5a2 2 0 002 2h12a2 2 0 002-2v-5a8 8 0 00-8-8zm0 18a2 2 0 01-2-2h4a2 2 0 01-2 2zm1-5H9v-2h2v2zm0-4H9V6h2v5z" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-lg font-medium text-gray-900">{notification.title}</div>
                <div className="text-gray-600">{notification.message}</div>
                <div className="text-sm text-gray-400 mt-2">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;



