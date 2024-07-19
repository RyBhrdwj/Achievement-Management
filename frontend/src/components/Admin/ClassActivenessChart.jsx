import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ClassActivenessChart = () => {
  const data = {
    labels: ['CSE A', 'CSE B', 'IT A', 'IT B'], // Dummy class names
    datasets: [
      {
        label: 'Active Students',
        data: [30, 25, 20, 15], // Dummy data
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Soft blue
        borderColor: 'rgba(54, 162, 235, 1)', // Dark blue
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333', // Dark gray for the legend text
          font: {
            size: 14,
            family: 'Arial, sans-serif', // Formal font
          },
        },
      },
      tooltip: {
        backgroundColor: '#333', // Dark background for tooltip
        titleColor: '#fff', // White title text
        bodyColor: '#fff', // White body text
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} students`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#666', // Light gray for x-axis labels
          font: {
            size: 12,
            family: 'Arial, sans-serif', // Formal font
          },
        },
        grid: {
          color: '#eee', // Light gray grid lines
        },
      },
      y: {
        ticks: {
          color: '#666', // Light gray for y-axis labels
          font: {
            size: 12,
            family: 'Arial, sans-serif', // Formal font
          },
        },
        grid: {
          color: '#eee', // Light gray grid lines
        },
      },
    },
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '20px', width: '100%' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Class-wise Activeness</h2>
      <div style={{ height: '350px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ClassActivenessChart;
