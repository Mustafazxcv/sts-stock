import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UnitPriceUpdater = ({ fetchUnits, units }) => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const handleUpdatePrice = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/cost/update-unit-price', {
        unit: selectedUnit,
        price: parseFloat(newPrice)
      });

      toast.success('Birim fiyatı başarıyla güncellendi!');
      fetchUnits();
      setSelectedUnit('');
      setNewPrice('');
    } catch (err) {
      toast.error('Birim fiyatı güncellenirken bir hata oluştu.');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl mb-4 text-center font-bold text-blue-700">Birim Fiyatını Güncelle</h3>
      <form onSubmit={handleUpdatePrice}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Birim Türü</label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="" disabled>Birimi Seçin</option>
            {units && units.map(unit => (
              <option key={unit.unit} value={unit.unit}>{unit.unit} - {unit.price} TL</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Yeni Fiyat</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-bold"
          disabled={!selectedUnit || !newPrice}
        >
          Fiyatı Güncelle
        </button>
      </form>
    </div>
  );
};

export default UnitPriceUpdater;
