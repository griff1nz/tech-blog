const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async(req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async(req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        
        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password" });
            return;
        }
        
        const validatePassword = await userData.checkPassword(req.body.password);

        if (!validatePassword) {
            res.status(400).json({ message: "Incorrect email or password" });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            console.log(req.session.userId);
            req.session.loggedIn = true;
            res.status(200).json({ user: userData, message: "Logged in!" });
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/logout', async(req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;