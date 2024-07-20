import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatDate } from '../../utililtyFunctions';

const Announcement = ({ speed }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const response = await axios.get('/announcements/');
        setAnnouncements(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAnnouncements();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (announcements.length === 0) {
    return <div>No announcements available</div>;
  }

  // Define animation speeds for different screen sizes
  const animationSpeed = speed * 3; // Base speed for desktop
  const mobileAnimationSpeed = speed * 3; // Slower speed for mobile

  return (
    <div className="relative overflow-hidden w-full p-3 my-5 h-15 flex items-center bg-gradient-to-r from-green-300 to-green-500 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
      <div className="flex overflow-hidden w-full">
        <section
          style={{
            animation: `marquee ${animationSpeed}ms linear infinite`,
            fontSize: '1rem',
            lineHeight: '1.6rem',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}
          className="font-semibold tracking-wide md:animation-marquee-lg sm:animation-marquee-sm"
        >
          <p>
            {announcements.map((announcement, idx) => (
              <span key={idx}>
                <span className="bg-yellow-500 px-1 rounded-md mr-2">Announcement:</span>
                <span className="text-black">
                  {announcement.achievement?.userId.name} of {announcement.achievement?.userId.branch_section} won the {announcement.achievement?.name} {announcement.achievement?.description} organised by {announcement.achievement?.location} on {formatDate(announcement.achievement?.date)}.
                </span>
                {idx < announcements.length - 1 && '  |  '}
              </span>
            ))}
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

        @media (min-width: 768px) {
          .animation-marquee-lg {
            animation: marquee ${animationSpeed}ms linear infinite;
          }
        }

        @media (max-width: 767px) {
          .animation-marquee-sm {
            animation: marquee ${mobileAnimationSpeed}ms linear infinite;
          }
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
