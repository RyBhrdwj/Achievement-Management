import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RecentWinnerDetails = () => {
  const [winners, setWinners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const response = await axios.get('/announcements/');
        setWinners(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    getAnnouncements();
  }, []);

  const handleNext = () => {
    if (currentIndex < winners.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (winners.length === 0) {
    return (
      <div className="bg-gradient-to-r from-yellow-300 to-red-500 rounded-lg shadow-lg p-4 text-white font-sans text-center max-w-md mx-auto">
        <h2 className="text-black text-xl font-bold mb-2 border-b-2 border-white pb-1">🎉 Recent Winner 🎉</h2>
        <p className="text-black text-lg font-semibold">No current winners</p>
      </div>
    );
  }

  const winner = winners[currentIndex]?.achievement || {};

  return (
    <div className="bg-gradient-to-r from-yellow-300 to-red-500 rounded-lg shadow-lg p-4 text-white font-sans text-center max-w-md mx-auto">
      <h2 className="text-black text-xl font-bold mb-2 border-b-2 border-white pb-1">🎉 Recent Winner 🎉</h2>
      <div className="mb-3">
        <p className="text-black text-md font-semibold mb-1">Student Name:</p>
        <p className="text-lg font-bold">{winner.userId?.name}</p>
      </div>
      <div className="mb-3">
        <p className="text-black text-md font-semibold mb-1">Branch Section:</p>
        <p className="text-lg font-bold">{winner.userId?.branch_section}</p>
      </div>
      <div>
        <p className="text-black text-md font-semibold mb-1">Achievement:</p>
        <p className="text-lg font-bold">{winner.name}</p>
        <p className="text-sm font-medium">- - - {winner.description} - - -</p>
        <br/>
        <p className="text-black text-sm font-medium">Date: {new Date(winner.date).toLocaleDateString()}</p>
        <p className="text-black text-sm font-medium">Location: {winner.location}</p>
      </div>
      <div className="mt-4 flex justify-between max-w-xs mx-auto">
        <button 
          onClick={handlePrevious} 
          disabled={currentIndex === 0} 
          className={`px-3 py-1 bg-white text-black rounded-lg ${currentIndex === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
        >
          Previous
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentIndex === winners.length - 1} 
          className={`px-3 py-1 bg-white text-black rounded-lg ${currentIndex === winners.length - 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentWinnerDetails;
