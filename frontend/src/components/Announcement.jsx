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
    <div className="relative overflow-hidden w-full p-4 my-5 h-14 flex items-center transition-all duration-500 ease-in-out">
      <div className="flex overflow-hidden w-full">
        <section
          style={{
            animation: `marquee ${speed * 2}ms linear infinite`,
            fontSize: '1.5rem', // Small font size
            lineHeight: '1rem', // Adjusted line height
            background: 'linear-gradient(to right, #FFD700, #FFC700, #FFB700, #FF9900)',
            WebkitBackgroundClip: 'text',
            color: 'Green',
          }}
          className="whitespace-nowrap font-bold tracking-wide"
        >
          <p>
            <span className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              Announcement:
            </span> (Student Name) of (Student Class) (Student Year) Year won the (event type) (event name) held at (event venue) on (event date)
          </p>
        </section>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Announcement;











