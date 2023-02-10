const router = require('express').Router();
const userRoutes = require('./userRoutes');
const techblogRoutes = require('./timesheetRoutes');

router.use('/users', userRoutes);
router.use('/techblogs', techblogRoutes);

module.exports = router;
