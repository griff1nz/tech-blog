const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await BlogPost.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['title', 'content', 'user_id'],
                },
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('partial', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async(req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['title', 'content', 'user_id'],
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ],
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        })
        res.status(200).json(postData);
    } catch(err) {
        res.status(500).json(err);
    }
})

router.post('/comments', async(req, res) => {
    try {
        const userId = req.session.user_id;
        const commentData = await Comment.create({
            title: req.body.title,
            content: req.body.content,
            user_id: userId,
            post_id: req.body.post_id,
        });
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
})

router.get('/posts/:id/comments', async(req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/posts', async (req, res) => {
    try {
    const userId = req.session.user_id;
    console.log(userId);
    const newPost = await BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: userId,
    });
    res.status(200).json(newPost); 
} catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;