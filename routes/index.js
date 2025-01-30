const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const categoriesRoutes = require('./categoriesRoutes');
const carsRoutes = require('./carsRoutes');

router.use('/auth', authRoutes);
router.use('/categories', categoriesRoutes);
router.use('/cars', carsRoutes);

router.get('/', (req, res) => {
  if(process.env.MONGODB_URI){
    res.send('Test');
  }
  res.send('Test');
  console.error('Error during login:');
});

module.exports = router;