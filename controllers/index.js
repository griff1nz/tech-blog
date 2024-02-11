const router = require('express').Router();

const blogRoutes = require('./blog-routes');

router.use('/', blogRoutes);

module.exports = router;