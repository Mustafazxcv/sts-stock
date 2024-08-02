import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UnitAdder = ({ fetchUnits }) => {
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');

  const handleAddUnit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/cost/add-unit', {
        unit,
        price: parseFloat(price)
      });

      toast.success('Birim başarıyla eklendi!');
      fetchUnits();
      setUnit('');
      setPrice('');
    } catch (err) {
      toast.error('Birim eklenirken bir hata oluştu.');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl mb-4 text-center font-bold text-blue-700">Birim Ekle</h3>
      <form onSubmit={handleAddUnit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Birim Türü</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Fiyat</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 font-bold"
        >
          Birim Ekle
        </button>
      </form>
    </div>
  );
};

export default UnitAdder;
