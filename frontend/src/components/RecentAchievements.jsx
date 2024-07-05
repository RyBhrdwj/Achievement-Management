import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons/lib";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import axios from "axios";
import { formatDate } from "../utililtyFunctions";
import Loader from "./Loader";

const EventCard = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4 grid grid-cols-12 gap-2 justify-end items-center">
      <div className="col-span-1">
        <button
          onClick={toggleOpen}
          className="p-2 rounded-full bg-blue-600  hover:bg-blue-700 flex transition-colors justify-center items-center mt-2 md:mt-0"
        >
          <IconContext.Provider value={{ size: "40px", color: "white" }}>
            {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconContext.Provider>
        </button>
      </div>
      <div className="bg-blue-500 text-white rounded-l-full px-8 py-4 border-2 col-span-11 border-gray-200 rounded-lg shadow-md grid grid-cols-12 items-center">
        <div className="col-span-12 md:col-span-4">
          <h3 className="text-lg font-semibold">{event.name}</h3>
          <p
            className={`${
              event.result === "winner" ? " font-bold" : "font-thin"
            }`}
          >
            {event.result}
          </p>
        </div>
        <p className="col-span-12 md:col-span-3 mt-2 md:mt-0">{formatDate(event.date)}</p>
        <p className="font-thin text-lg col-span-12 md:col-span-4 mt-2 md:mt-0">
          {event.location}
        </p>
      </div>
      <div
        className={`${!isOpen ? "h-0 hidden" : "h-full block"} col-span-12 transition-all p-4`}
      >
        <div className="p-4 bg-gray-50 rounded-lg">
          <table className="table-auto mx-auto w-2/3 border-collapse border border-gray-400">
            <tbody>
              <tr>
                <th className="text-left p-2 border border-gray-400 w-1/2">
                  Name of the event:
                </th>
                <td className="p-2 border border-gray-400 w-1/2">
                  {event.name}
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-400 w-1/2">
                  Date:
                </th>
                <td className="p-2 border border-gray-400 w-1/2">
                  {formatDate(event.date)}
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-400 w-1/2">
                  Event Type:
                </th>
                <td className="p-2 border border-gray-400 w-1/2">
                  {event.description}
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-400 w-1/2">
                  Mode:
                </th>
                <td className="p-2 border border-gray-400 w-1/2">
                  {event.mode}
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-400 w-1/2">
                  Venue(or link):
                </th>
                <td className="p-2 border border-gray-400 w-1/2">
                  {event.location}
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 border border-gray-400 w-1/2">
                  Result:
                </th>
                <td className="p-2 border border-gray-400 w-1/2">
                  {event.result}
                </td>
              </tr>
              {/* <tr>
            <th className="text-left p-2 border border-gray-400 w-1/2">Proof:</th>
            <td className="p-2 border border-gray-400 w-1/2">
              {details.proofUrl ? (
                <>
                  <span>Submitted</span>
                  <button
                    onClick={handleShowProof}
                    className="ml-2 text-blue-500 underline"
                  >
                    {showProof ? "Hide Proof" : "Show Proof"}
                  </button>
                  {showProof && (
                    <div className="mt-2">
                      <img
                        src={event.proofUrl}
                        alt="Proof"
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                </>
              ) : (
                <span>Not Submitted</span>
              )}
            </td>
          </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RecentAchievements = ({events,setEvents}) => {
  const [sortCriteria, setSortCriteria] = useState("A-Z");
  

  useEffect(() => {
    sortEvents(sortCriteria);
  }, [sortCriteria, events]);


  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const sortEvents = (criteria) => {
    let sortedEvents = [...events];
    switch (criteria) {
      case "A-Z":
        sortedEvents.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedEvents.sort((a, b) => b.name.localeCompare(a.name));
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
    if (JSON.stringify(sortedEvents) !== JSON.stringify(events)) {
      setEvents(sortedEvents);
    }
  };
  

  return (
    <div className="p-4 md:mb-14">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <h1 className="text-3xl font-bold py-10 md:py-20">
          Recent Achievements
        </h1>
        <select
          value={sortCriteria}
          onChange={handleSortChange}
          className="outline-none p-2 border-b bg-gray-100 border-gray-600 rounded-md mt-4 md:mt-0"
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
      <div className="flex flex-col gap-4">
        {events.length === 0 ? (
          <Loader />
        ) : (
          events.map((event, idx) => <EventCard event={event} key={idx} />)
        )}
      </div>
    </div>
  );
};

export default RecentAchievements;
