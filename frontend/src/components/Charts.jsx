import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {events} from '../constants.js'

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
    <canvas id="myChart" width="400" height="400"></canvas>
  );
}

export default Charts;
