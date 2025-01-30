const express = require('express');
const router = express.Router();
const Car = require('../models/cars');
const Category = require('../models/categories');

router.post('/', async (req, res) => {
    try {
      const { name, model, color, makeYear, registrationNumber, carType } = req.body;
      const categoryExists = await Category.findById(carType);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid car category' });
      }
      const car = new Car({
        name,
        model,
        color,
        makeYear,
        registrationNumber,
        carType,
      });
  
      const savedCar = await car.save();
      res.status(201).json(savedCar);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const cars = await Car.find().select('name model color makeYear registrationNumber carCategory');
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.put('/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
        res.json(updatedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) return res.status(404).json({ message: 'Car not found' });
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
