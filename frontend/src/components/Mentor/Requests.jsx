import React, { useState } from 'react';
import { formatDate } from '../../utililtyFunctions';
import axios from 'axios';


const Requests = ({ requests, getRequests }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleOpenRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseRequest = () => {
    setSelectedRequest(null);
  };

  const handleAcceptRequest = () => {
    const message = `Congratulations, your achievement ${selectedRequest.achievement?.name} ${selectedRequest.achievement?.description} held on ${formatDate(selectedRequest.achievement?.date)} at ${selectedRequest.achievement?.location} has been verified by the Mentor`;
    sendNotification(message);
    const id = selectedRequest.achievement?._id;
    const status = 'accepted';
    updateAchievement({ id, status });
    deleteRequest(selectedRequest._id);
  };

  const handleRejectRequest = () => {
    const rejectionMessage = `Unfortunately, your achievement ${selectedRequest.achievement?.name} ${selectedRequest.achievement?.description} held on ${formatDate(selectedRequest.achievement?.date)} at ${selectedRequest.achievement?.location} has not been verified by the Mentor. Please review the requirements and try again.`;
    sendNotification(rejectionMessage);
    const id = selectedRequest.achievement?._id;
    const status = 'rejected';
    updateAchievement({ id, status });
    deleteRequest(selectedRequest._id);
  };

  const updateAchievement = async ({ id, status }) => {
    try {
      await axios.patch(`/verify-achievement/${id}/${status}`);
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseRequest();
    }
  };

  const sendNotification = async (message) => {
    const user = selectedRequest.user?._id;
    const mentor = selectedRequest.mentor?._id;
    try {
      await axios.post('/add-notification', { user, message, mentor });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      await axios.delete(`/delete-request/${requestId}`);
      getRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Requests</h1>
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-70 bg-white rounded-lg p-6">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
            alt="No Requests"
            className="w-44 h-44 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Requests Found</h2>
          <p className="text-gray-600">There are currently no requests for verification.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {requests.map((request, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md rounded-lg p-6 cursor-pointer transform hover:scale-110 transition-transform duration-300"
              onClick={() => handleOpenRequest(request)}
              style={{ width: '70%', margin: 'auto' }}
            >
              <h2 className="text-xl font-semibold text-white mb-2">{request.achievement?.name}</h2>
              <div className="flex justify-between">
                <div>
                  <p className="text-white"><strong>Student:</strong> {request.user?.name}</p>
                  <p className="text-white"><strong>Enrollment Number:</strong> {request.user?.enrollmentNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-white"><strong>Date:</strong> {formatDate(request.achievement?.date)}</p>
                  <p className="text-white"><strong>Event Type:</strong> {request.achievement?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full transform scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {selectedRequest.achievement?.name}
            </h2>
            <div className="mb-6 border-b pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h3>
              <p className="text-gray-800 mb-2"><strong>Name:</strong> {selectedRequest.user?.name}</p>
              <p className="text-gray-800 mb-2"><strong>Enrollment Number:</strong> {selectedRequest.user?.enrollmentNumber}</p>
              <p className="text-gray-800 mb-2"><strong>Branch and Section:</strong> {selectedRequest.user?.branch_section}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievement Information</h3>
              <p className="text-gray-600 mb-4 capitalize font-bold">{selectedRequest.achievement?.description}</p>
              <p className="text-gray-800 mb-2"><strong>Date:</strong> {formatDate(selectedRequest.achievement?.date)}</p>
              <p className="text-gray-800 mb-2"><strong>Event Name:</strong> {selectedRequest.achievement?.name}</p>
              <p className="text-gray-800 mb-2"><strong>Result:</strong> {selectedRequest.achievement?.result}</p>
              <p className="text-gray-800 mb-2"><strong>Mode:</strong> {selectedRequest.achievement?.mode}</p>
              <p className="text-gray-800 mb-2"><strong>Location:</strong> <a href={selectedRequest.achievement?.location} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{selectedRequest.achievement?.location}</a></p>
              {selectedRequest.achievement?.proof && (
                <p className="text-gray-800 mb-2"><strong>Proof:</strong> <a href={selectedRequest.achievement?.proof} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{selectedRequest.achievement?.proof}</a></p>
              )}
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
