import React, { useState, useEffect } from "react";
import { events as eventsData } from "../constants";
import { IconContext } from "react-icons/lib";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const EventCard = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className="bg-gray-100 p-4 border-2 border-gray-200 rounded-lg shadow-md grid grid-cols-12 items-center">
        <div className="col-span-4">
          <h3 className="text-lg font-semibold">{event.eventName}</h3>
          <p
            className={`${
              event.result === "won"
                ? "text-green-700 font-bold"
                : "text-blue-800"
            }`}
          >
            {event.result}
          </p>
        </div>
        <p className="col-span-3">{event.date}</p>
        <p className="font-thin text-lg col-span-4">{event.location}</p>
        <button
          onClick={toggleOpen}
          className="p-2 rounded-full hover:bg-gray-200 flex justify-center items-center col-span-1 w-14"
        >
          <IconContext.Provider value={{ size: "30px" }}>
            {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconContext.Provider>
        </button>
      </div>
      <div className={`${!isOpen ? "h-0 hidden" : "h-full block"} transition-all`}>
        HELLO
      </div>
    </div>
  );
};

const RecentAchievements = () => {
  const [sortCriteria, setSortCriteria] = useState("A-Z");
  const [events, setEvents] = useState(eventsData);

  useEffect(() => {
    sortEvents(sortCriteria);
  }, [sortCriteria]);

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const sortEvents = (criteria) => {
    let sortedEvents = [...events];
    switch (criteria) {
      case "A-Z":
        sortedEvents.sort((a, b) => a.eventName.localeCompare(b.eventName));
        break;
      case "Z-A":
        sortedEvents.sort((a, b) => b.eventName.localeCompare(a.eventName));
        break;
      case "Newest":
        sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Oldest":
        sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }
    setEvents(sortedEvents);
  };

  return (
    <div className="p-4 mb-14">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold py-20">Recent Achievements</h1>
        <select
          value={sortCriteria}
          onChange={handleSortChange}
          className="outline-none p-2 border-b bg-gray-100 border-gray-600 rounded-md"
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
      <div className="flex flex-col gap-4 ">
        {events.map((event, idx) => (
          <EventCard event={event} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default RecentAchievements;
