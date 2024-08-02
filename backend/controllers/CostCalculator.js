const pool = require('../config/db');

const calculateCost = async (req, res) => {
  const { unitType, quantity, additionalCosts } = req.body;

  if (!unitType || !quantity) {
    return res.status(400).json({ error: 'Gerekli tüm alanlar doldurulmalıdır.' });
  }

  try {
    const unitPriceQuery = await pool.query('SELECT price FROM fabric_units WHERE unit = $1', [unitType]);
    const unitPriceFromDB = unitPriceQuery.rows[0]?.price;

    if (!unitPriceFromDB) {
      return res.status(404).json({ error: 'Geçersiz birim türü' });
    }

    const totalUnitCost = unitPriceFromDB * quantity;
    const totalCost = totalUnitCost + (additionalCosts || 0);

    await pool.query(
      'INSERT INTO cost_data (unit_type, unit_price, quantity, additional_costs, total_unit_cost, total_cost) VALUES ($1, $2, $3, $4, $5, $6)',
      [unitType, unitPriceFromDB, quantity, additionalCosts, totalUnitCost, totalCost]
    );

    res.status(200).json({
      unitType,
      unitPrice: unitPriceFromDB,
      quantity,
      additionalCosts,
      totalUnitCost,
      totalCost,
    });
  } catch (error) {
    console.error('Maliyet hesaplama hatası:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getUnits = async (req, res) => {
  try {
    const unitsQuery = await pool.query('SELECT unit, price FROM fabric_units');
    res.status(200).json(unitsQuery.rows);
  } catch (error) {
    console.error('Birimleri alma hatası:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getCostData = async (req, res) => {
  try {
    const costDataQuery = await pool.query('SELECT * FROM cost_data');
    res.status(200).json(costDataQuery.rows);
  } catch (error) {
    console.error('Maliyet verilerini alma hatası:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateUnitPrice = async (req, res) => {
  const { unit, price } = req.body;

  if (!unit || !price) {
    return res.status(400).json({ error: 'Birim ve fiyat belirtilmelidir.' });
  }

  try {
    await pool.query('UPDATE fabric_units SET price = $1 WHERE unit = $2', [price, unit]);
    res.status(200).json({ message: 'Birim fiyatı güncellendi.' });
  } catch (error) {
    console.error('Birim fiyatını güncellerken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const addUnit = async (req, res) => {
  const { unit, price } = req.body;

  if (!unit || !price) {
    return res.status(400).json({ error: 'Birim ve fiyat belirtilmelidir.' });
  }

  try {
    await pool.query('INSERT INTO fabric_units (unit, price) VALUES ($1, $2)', [unit, price]);
    res.status(200).json({ message: 'Birim başarıyla eklendi.' });
  } catch (error) {
    console.error('Birim eklenirken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteCostData = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM cost_data WHERE id = $1', [id]);
    res.status(200).json({ message: 'Maliyet başarıyla silindi.' });
  } catch (error) {
    console.error('Maliyet verisini silerken hata oluştu:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { calculateCost, getUnits, getCostData, updateUnitPrice, addUnit, deleteCostData, };
