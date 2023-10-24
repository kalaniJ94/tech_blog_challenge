const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tipRoutes = require('./tipRoutes');
const commentRoutes = require("./commentRoutes");

router.use('/users', userRoutes);
router.use('/tips', tipRoutes);
router.use("/comment", commentRoutes);

module.exports = router; 