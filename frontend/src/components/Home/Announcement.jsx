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
    <div className="relative overflow-hidden w-full p-3 my-5 h-15 flex items-center bg-gradient-to-r from-green-300 to-green-500 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
      <div className="flex overflow-hidden w-full">
        <section
          style={{
            animation: `marquee ${speed * 2}ms linear infinite`,
            fontSize: '1rem',
            lineHeight: '1.6rem',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}
          className="font-semibold tracking-wide"
        >
          <p>
            <span className="bg-yellow-500 px-1 rounded-md mr-2">
              Announcement:
            </span>
            <span className="text-black"> (Student Name) of (Student Class) (Student Year) Year won the (event type) (event name) held at (event venue) on (event date)</span>
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

        .jungle-background {
          background-image: url('https://path-to-jungle-background-image.jpg');
          background-size: cover;
          background-position: center;
        }

        .jungle-elements {
          position: absolute;
          z-index: -1;
          opacity: 0.3;
        }

        .left-vines {
          top: 0;
          left: 0;
          height: 100%;
        }

        .right-vines {
          top: 0;
          right: 0;
          height: 100%;
        }
      `}</style>
      <div className="jungle-elements left-vines">
        <img src="https://path-to-left-vines-image.png" alt="Left Vines" />
      </div>
      <div className="jungle-elements right-vines">
        <img src="https://path-to-right-vines-image.png" alt="Right Vines" />
      </div>
    </div>
  );
};

export default Announcement;


















