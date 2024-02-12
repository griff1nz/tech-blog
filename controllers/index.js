const router = require('express').Router();

const blogRoutes = require('./blog-routes');

const apiRoutes = require('./api');

router.use('/', blogRoutes);
router.use('/api', apiRoutes);

module.exports = router;