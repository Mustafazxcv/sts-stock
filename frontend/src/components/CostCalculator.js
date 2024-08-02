import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnitPriceUpdater from './UnitPriceUpdater';
import UnitAdder from './UnitAdder';
import CostChart from './CostChart';
import CostList from './CostList';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CostCalculator = () => {
  const [unitType, setUnitType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [additionalCosts, setAdditionalCosts] = useState('');
  const [units, setUnits] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Maliyetler',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  });

  useEffect(() => {
    fetchUnits();
    fetchCostData();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cost/units');
      setUnits(response.data);
    } catch (error) {
      toast.error('Birimleri alırken bir hata oluştu.');
    }
  };

  const fetchCostData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cost/cost-data');
      const costData = response.data;

      const labels = costData.map(data => `${data.unit_type} - ${data.quantity}`);
      const data = costData.map(data => data.total_cost);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Maliyetler',
            data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      });
    } catch (error) {
      toast.error('Maliyet verilerini alırken bir hata oluştu.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/cost/calculate', {
        unitType,
        quantity,
        additionalCosts: parseFloat(additionalCosts) || 0
      });

      toast.success('Maliyet başarıyla hesaplandı!');
      fetchCostData(); // Maliyet verilerini tekrar getir
    } catch (err) {
      toast.error('Maliyet hesaplanırken bir hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center font-bold text-blue-700">Maliyet Hesaplayıcı</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Birim Türü</label>
            <select
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            >
              <option value="" disabled>Birimi Seçin</option>
              {units.map(unit => (
                <option key={unit.unit} value={unit.unit}>{unit.unit} - {unit.price} TL</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Miktar</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Ekstra Maliyetler</label>
            <input
              type="number"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={additionalCosts}
              onChange={(e) => setAdditionalCosts(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-bold"
          >
            Maliyet Hesapla
          </button>
        </form>
        <ToastContainer />

        <UnitAdder fetchUnits={fetchUnits} />
        <UnitPriceUpdater fetchUnits={fetchUnits} units={units} />
      </div>
      <div className="mt-8 w-full max-w-md">
        <CostChart chartData={chartData} />
        <CostList fetchCostDataFromParent={fetchCostData} />
      </div>
    </div>
  );
};

export default CostCalculator;
