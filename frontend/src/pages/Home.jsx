import React, {useState,useEffect} from "react";
import Charts from "../components/Charts";
import EventCalender from "../components/EventCalender";
import RecentAchievements from "../components/RecentAchievements";
import axios from "axios";
const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getAchievements = async () => {
      try {
        const response = await axios.get(
          "https://amgmt.onrender.com/api/achievements/03520802722"
        );
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAchievements();
  }, []);
  console.log(events)
  return (
    <div className="p-2 sm:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-12 w-full h-full justify-center items-center">
        <div className="col-span-8">
          <Charts events={events} />
        </div>
        {window.innerWidth > 768 && <div className="col-span-4">
          <EventCalender events={events} />
        </div>}
      </div>
      <RecentAchievements events={events} setEvents={setEvents} />
    </div>
  );
};

export default Home;
