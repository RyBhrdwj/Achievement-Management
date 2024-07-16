import React from "react";

const Form1 = ({ details, setDetails }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <fieldset className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Event Name:
          </label>
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            placeholder="Enter the name of the event"
            className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
          />
        </fieldset>
        <fieldset className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Event Date:
          </label>
          <input
            type="date"
            name="date"
            value={details.date}
            onChange={(e) => setDetails({ ...details, date: e.target.value })}
            placeholder="Enter the date of the event"
            className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
          />
        </fieldset>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <fieldset className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Type of event:
          </label>
          <select
            className="py-2 px-4 bg-white border-2 border-gray-300 rounded-md"
            value={details.type}
            onChange={(e) => setDetails({ ...details, type: e.target.value })}
          >
            <option value="hackathon">Hackathon</option>
            <option value="ideathon">Ideathon</option>
            <option value="seminar">Seminar</option>
            <option value="meetup">Meetup</option>
            <option value="other">Other</option>
          </select>
        </fieldset>
        <fieldset className="flex flex-col space-y-2">
          <label
            className={`text-lg font-medium ${
              details.type === "other" ? "text-gray-700" : "text-gray-400"
            }`}
          >
            Other:
          </label>
          <input
            type="text"
            name="name"
            placeholder="In case of other please specify"
            className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
            disabled={details.type === "other" ? false : true}
            onChange={(e) =>
              setDetails({ ...details, otherType: e.target.value })
            }
          />
        </fieldset>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <fieldset className="grid border-2 col-span-1 border-gray-300 p-4 rounded-lg">
          <legend className="text-lg font-medium text-gray-700">Mode:</legend>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                name="mode"
                value="online"
                className="form-radio text-blue-500 focus:ring-blue-500"
                onChange={(e) =>
                  setDetails({ ...details, mode: e.target.value })
                }
              />
              <span className="text-lg">Online</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                name="mode"
                value="offline"
                className="form-radio text-blue-500 focus:ring-blue-500"
                onChange={(e) =>
                  setDetails({ ...details, mode: e.target.value })
                }
              />
              <span className="text-lg">Offline</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-1 sm:col-span-2 sm:grid-cols-3 gap-4 border-2 border-gray-300 p-4 rounded-lg">
          <legend className="text-lg font-medium text-gray-700">Result:</legend>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                name="result"
                value="winner"
                className="form-radio text-blue-500 focus:ring-blue-500"
                onChange={(e) =>
                  setDetails({ ...details, result: e.target.value })
                }
              />
              <span className="text-lg">Won</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                name="result"
                value="participant"
                className="form-radio text-blue-500 focus:ring-blue-500"
                onChange={(e) =>
                  setDetails({ ...details, result: e.target.value })
                }
              />
              <span className="text-lg">Participated</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="radio"
                name="result"
                value="runner up"
                className="form-radio text-blue-500 focus:ring-blue-500"
                onChange={(e) =>
                  setDetails({ ...details, result: e.target.value })
                }
              />
              <span className="text-lg">Runner up</span>
            </label>
          </div>
        </fieldset>
      </div>
      <fieldset className="flex flex-col space-y-2">
        <label className="text-lg font-medium text-gray-700">
          Event Venue(Link in case of online mode):
        </label>
        <textarea
          name="location"
          placeholder="Enter the location of the event"
          className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
          onChange={(e) => setDetails({ ...details, location: e.target.value })}
        />
      </fieldset>
    </div>
  );
};

export default Form1;