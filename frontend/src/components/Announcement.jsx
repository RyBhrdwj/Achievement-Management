import React, { useEffect, useState } from 'react';

const Announcement = ({ speed }) => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  useEffect(() => {
    const checkDate = () => {
      const storedDate = localStorage.getItem('announcementDate');
      const currentDate = new Date();

      if (storedDate) {
        const previousDate = new Date(storedDate);
        const oneDayInMillis = 24 * 60 * 60 * 1000;

        // Check if a day has passed
        if (currentDate - previousDate < oneDayInMillis) {
          setShowAnnouncement(true);
        } else {
          localStorage.setItem('announcementDate', currentDate.toISOString());
          setShowAnnouncement(false);
        }
      } else {
        localStorage.setItem('announcementDate', currentDate.toISOString());
        setShowAnnouncement(true);
      }
    };

    checkDate();
  }, []);

  if (!showAnnouncement) {
    return null;
  }

  return (
    <div className="relative bg-yellow-100 overflow-hidden w-full my-5 rounded shadow-md p-2 h-10">
      <div className="absolute flex">
        <section style={{ "--speed": `${speed}ms` }} className="">
          <h1 className=" whitespace-nowrap"><b>Announcement:</b> (Student Name) of (Student Class) (Student Year) Year won the (event type) (event name) held at (event venue) on (event date)</h1>
        </section>
      </div>
    </div>
  );
};

export default Announcement;
