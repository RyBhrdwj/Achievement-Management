import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { events } from '../constants.js';

const Charts = () => {
  const aggregateMonthlyData = (events) => {
    const monthlyCounts = Array(12).fill(0);
    const monthlyEvents = Array(12).fill("").map(() => []);

    events.forEach(event => {
      const month = new Date(event.date).getMonth();
      monthlyCounts[month]++;
      monthlyEvents[month].push(event.eventName);
    });

    return { monthlyCounts, monthlyEvents };
  };

  const { monthlyCounts, monthlyEvents } = aggregateMonthlyData(events);

  const [userData, setUserData] = useState({
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [{
      label: "Event Participation",
      data: monthlyCounts,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  });

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const newChartInstance = new Chart(
      document.getElementById('myChart'),
      {
        type: 'bar',
        data: userData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Monthly Event Participation'
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  const monthIndex = tooltipItem.dataIndex;
                  const eventNames = monthlyEvents[monthIndex].join(', ');
                  return `Events: ${eventNames}`;
                }
              }
            }
          }
        }
      }
    );

    chartRef.current = newChartInstance;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [userData]);

  return (
    <div className='w-full p-4'>
      <h1 className='text-2xl md:text-4xl font-bold text-center pb-4'>Monthly Statistics</h1>
      <div className='relative w-full h-64 md:h-96'>
        <canvas id="myChart" className='border-2 border-gray-300 p-4 rounded-md shadow-lg'></canvas>
      </div>
    </div>
  );
};

export default Charts;
