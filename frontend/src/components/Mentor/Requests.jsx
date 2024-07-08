import React, { useState } from 'react';

const Requests = ({ requests }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleOpenRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseRequest = () => {
    setSelectedRequest(null);
  };

  const handleAcceptRequest = () => {
    console.log('Request Accepted:', selectedRequest);
    // Add your accept logic here
    setSelectedRequest(null);
  };

  const handleRejectRequest = () => {
    console.log('Request Rejected:', selectedRequest);
    // Add your reject logic here
    setSelectedRequest(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-purple-700 via-pink-500 to-green-800 shadow-md rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleOpenRequest(request)}
          >
            <h2 className="text-xl font-semibold text-white mb-2">{request.title}</h2>
            <p className="text-white">Aditya Gaur</p>
            <p className="text-white">Enrollment Number</p>
            <p className="text-white text-right">Date</p>
            <p className="text-white text-right">Event Name</p>
          </div>
        ))}
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full transform scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedRequest.title}</h2>
            <p className="text-gray-600 mb-6">{selectedRequest.description}</p>
            <div className="mb-6">
              <p className="text-gray-800 mb-2"><strong>Mentor:</strong> Aditya Gaur</p>
              <p className="text-gray-800 mb-2"><strong>Enrollment Number:</strong> {selectedRequest.enrollmentNumber}</p>
              <p className="text-gray-800 mb-2"><strong>Date:</strong> {selectedRequest.date}</p>
              <p className="text-gray-800 mb-2"><strong>Event Name:</strong> {selectedRequest.eventName}</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                onClick={handleAcceptRequest}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                onClick={handleRejectRequest}
              >
                Reject
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                onClick={handleCloseRequest}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;



