const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('partial');
});

module.exports = router;