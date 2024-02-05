const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('bruh');
});

module.exports = router;