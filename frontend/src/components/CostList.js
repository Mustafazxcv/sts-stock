import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CostList = ({ fetchCostDataFromParent }) => {
  const [costData, setCostData] = useState([]);

  useEffect(() => {
    fetchCostData();
  }, []);

  const fetchCostData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cost/cost-data');
      setCostData(response.data);
    } catch (error) {
      toast.error('Maliyet verilerini alırken bir hata oluştu.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cost/${id}`);
      toast.success('Maliyet başarıyla silindi!');
      fetchCostData();
      fetchCostDataFromParent();
    } catch (error) {
      toast.error('Maliyet silinirken bir hata oluştu.');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl mb-4 text-center font-bold text-blue-700">Maliyet Listesi</h3>
      <ul className="bg-white p-4 rounded shadow-md">
        {costData.map((cost, index) => (
          <li key={cost.id} className="border-b border-gray-300 py-2 flex justify-between items-center">
            <span className="font-semibold">Maliyet {index + 1}: {cost.unit_type} - {cost.quantity} - {cost.total_cost} TL</span>
            <button
              onClick={() => handleDelete(cost.id)}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CostList;
