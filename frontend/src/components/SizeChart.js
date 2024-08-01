import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const SizeChart = ({ sizeCounts }) => {
  const data = {
    labels: sizeCounts.map(size => size.size),
    datasets: [{
      data: sizeCounts.map(size => size.count),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  return (
    <div className="chart-container">
      <h2>Boyut Dağılımı</h2>
      <Pie data={data} />
    </div>
  );
};

export default SizeChart;
