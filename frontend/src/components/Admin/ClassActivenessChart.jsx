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
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} students`;
          },
        },
      },
    },
  };

  return (
    <div className='bg-white rounded shadow p-4 mb-4'>
      <h2 className='text-xl font-bold mb-4'>Class-wise Activeness</h2>
      <div className='h-64'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ClassActivenessChart;
