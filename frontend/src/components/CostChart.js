import React from 'react';
import { Bar } from 'react-chartjs-2';

const CostChart = ({ chartData }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl mb-4 text-center font-bold text-blue-700">Maliyet Grafiği</h3>
      <div className="bg-white p-4 rounded shadow-md">
        <Bar data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default CostChart;
