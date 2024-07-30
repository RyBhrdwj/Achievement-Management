import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "../../utililtyFunctions";
import { Snackbar, Alert } from "@mui/material";

const Requests = ({ mentorId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await axios.get(`/requests/${mentorId}`);
        setRequests(response.data);
      } catch (error) {
        console.log(error);
        setError("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, [mentorId]);

  const handleOpenRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseRequest = () => {
    setSelectedRequest(null);
  };

  const addToAnnouncement = async () => {
    try {
      const achievementId = selectedRequest.achievement._id;
      await axios.post("/announcements", { achievement: achievementId });
      setSnackbarMessage("Added to announcement successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error adding to announcement");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleAcceptRequest = async () => {
    const message = `Congratulations, your achievement ${
      selectedRequest.achievement?.name
    } ${selectedRequest.achievement?.description} held on ${formatDate(
      selectedRequest.achievement?.date
    )} at ${
      selectedRequest.achievement?.location
    } has been verified by the Mentor`;
    await sendNotification(message);
    await updateAchievement({
      id: selectedRequest.achievement?._id,
      status: "accepted",
    });
    await deleteRequest(selectedRequest._id);
    setSnackbarMessage("Request accepted successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleRejectRequest = async () => {
    const rejectionMessage = `Unfortunately, your achievement ${
      selectedRequest.achievement?.name
    } ${selectedRequest.achievement?.description} held on ${formatDate(
      selectedRequest.achievement?.date
    )} at ${
      selectedRequest.achievement?.location
    } has not been verified by the Mentor. Please review the requirements and try again.`;
    await sendNotification(rejectionMessage);
    await updateAchievement({
      id: selectedRequest.achievement?._id,
      status: "rejected",
    });
    await deleteRequest(selectedRequest._id);
    setSnackbarMessage("Request rejected successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const updateAchievement = async ({ id, status }) => {
    try {
      await axios.patch(`/verify-achievement/${id}/${status}`);
    } catch (error) {
      console.error(error);
    } finally {
      handleCloseRequest();
    }
  };

  const sendNotification = async (message) => {
    const user = selectedRequest.user?._id;
    const mentor = selectedRequest.mentor?._id;
    try {
      await axios.post("/add-notification", { user, message, mentor });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      await axios.delete(`/delete-request/${requestId}`);
      const response = await axios.get(`/requests/${mentorId}`);
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Requests
      </h1>
      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p>{error}</p>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-6">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
            alt="No Requests"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No Requests Found
          </h2>
          <p className="text-gray-600">
            There are currently no requests for verification.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((request, index) => (
            <div
              key={index}
              onClick={() => handleOpenRequest(request)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md rounded-lg p-4 cursor-pointer transform hover:scale-[1.02] transition-transform duration-300"
            >
              <h2 className="text-lg font-semibold text-white mb-2">
                {request.achievement?.name}
              </h2>
              <div className="flex justify-between text-sm text-white">
                <div>
                  <p>
                    <strong>Student:</strong> {request.user?.name}
                  </p>
                  <p>
                    <strong>Enrollment Number:</strong>{" "}
                    {request.user?.enrollmentNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p>
                    <strong>Date:</strong>{" "}
                    {formatDate(request.achievement?.date)}
                  </p>
                  <p>
                    <strong>Event Type:</strong>{" "}
                    {request.achievement?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              onClick={handleCloseRequest}
              className="absolute top-2 right-2 text-gray-600 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {selectedRequest.achievement?.name}
            </h2>
            <div className="mb-4 border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Student Information
              </h3>
              <p>
                <strong>Name:</strong> {selectedRequest.user?.name}
              </p>
              <p>
                <strong>Enrollment Number:</strong>{" "}
                {selectedRequest.user?.enrollmentNumber}
              </p>
              <p>
                <strong>Branch and Section:</strong>{" "}
                {selectedRequest.user?.branch_section}
              </p>
            </div>
            <div className="mb-4 h-80 overflow-scroll">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Achievement Information
              </h3>
              <p>
                <strong>Date:</strong>{" "}
                {formatDate(selectedRequest.achievement?.date)}
              </p>
              <p>
                <strong>Event Type:</strong>{" "}
                {selectedRequest.achievement?.is_Technical
                  ? "Technical"
                  : "Non Technical"}
              </p>
              <p>
                <strong>Result:</strong> {selectedRequest.achievement?.result}
              </p>
              <p>
                <strong>Mode:</strong> {selectedRequest.achievement?.mode}
              </p>
              <p>
                <strong>Location:</strong>
                {selectedRequest.achievement?.location}
              </p>
              {selectedRequest.achievement?.proof &&
                selectedRequest.achievement.proof.length > 0 && (
                  <div>
                    <p>
                      <strong>Proof:</strong>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.achievement.proof.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`proof-${index}`}
                          className="h-40 w-auto object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 justify-end">
              <button
                onClick={handleAcceptRequest}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Accept
              </button>
              {selectedRequest.achievement.result === "winner" && (
                <button
                  onClick={addToAnnouncement}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  Add to Announcement
                </button>
              )}
              <button
                onClick={handleRejectRequest}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Reject
              </button>
              <button
                onClick={handleCloseRequest}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Requests;
