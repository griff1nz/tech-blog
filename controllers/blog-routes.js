const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');

router.get('/', async (req, res) => {
    res.render('partial');
});

router.get('/login', async(req, res) => {
    res.render('login');
});

router.get('/signup', async(req, res) => {
    res.render('signup');
});

module.exports = router;