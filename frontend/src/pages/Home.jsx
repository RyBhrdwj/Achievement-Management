import React, { useState, useEffect } from "react";
import Charts from "../components/Charts";
import EventCalender from "../components/EventCalender";
import RecentAchievements from "../components/RecentAchievements";
import axios from "axios";
import Announcement from "../components/Announcement";
import Loader from "../components/Loader";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading to true

  useEffect(() => {
    const getAchievements = async () => {
      try {
        const userId = "6692353576002fc8b2ab2b37"
        const response = await axios.get(
          `https://amgmt.onrender.com/api/achievements/${userId}`
        );
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Ensure loading is set to false in both success and error cases
      }
    };
    getAchievements();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="px-2 sm:px-6">
      <Announcement speed={window.innerWidth > 768 ? 10000 : 20000} />
      <div className="grid grid-cols-1 sm:grid-cols-12 w-full h-full justify-center items-center p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 mb-4">
        <div className="col-span-8">
          <Charts events={events} />
        </div>
        {window.innerWidth > 768 && (
          <div className="col-span-4">
            <EventCalender events={events} />
          </div>
        )}
      </div>
      <RecentAchievements events={events} setEvents={setEvents} />
    </div>
  );
};

export default Home;
