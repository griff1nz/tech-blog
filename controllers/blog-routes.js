const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const moment = require('moment');

router.get('/', async (req, res) => {
    try {
        const postData = await BlogPost.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['content', 'user_id'],
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ]
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

router.get('/posts/:id', async (req, res) => {
    try {
        const dbPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['content', 'user_id', 'date'],
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
        const postData = dbPostData.get({ plain: true });
        res.render('post', { postData, loggedIn: req.session.loggedIn });
        // res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/posts/:id/comments', async (req, res) => {
    try {
        const today = moment().format('MM-DD-YYYY');
        const userId = req.session.userId;
        console.log(userId);
        const commentData = await Comment.create({
            content: req.body.content,
            user_id: userId,
            post_id: req.params.id,
            date: today
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/posts/:id/comments', async (req, res) => {
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
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/posts', async (req, res) => {
    try {
        const today = moment().format('MM-DD-YYYY');
        const userId = req.session.userId;
        console.log(userId);
        const newPost = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            user_id: userId,
            date: today,
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

router.get('/newpost', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('newpost', { loggedIn: req.session.loggedIn });
})

router.get('/posts/:id/edit', async (req, res) => {
    const post = await BlogPost.findByPk(req.params.id); 
    if (req.session.userId !== post.user_id) {
        res.redirect('/');
        return;
    }
    res.render('edit', { loggedIn: req.session.loggedIn, postTitle: post.title, postContent: post.content });
})

router.put('/posts/:id/edit', async (req, res) => {
    try {
    const postToUpdate = await BlogPost.findByPk(req.params.id); 
    if (req.session.userId !== postToUpdate.user_id) {
        res.status(500).json("You can't edit that post.");
        return;
    }
    // console.log(postToUpdate.date);
    const updatedPost = await BlogPost.update(
        {
            title: req.body.title,
            content: req.body.content,
            date: postToUpdate.date,
            user_id: postToUpdate.user_id,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );
    // res.redirect(`/posts/${req.params.id}`)
    res.status(200).json()
    } catch(err) {
        res.status(500).json(err);
    }
})

router.get('/posts/:id/delete', async(req, res) => {
    const post = await BlogPost.findByPk(req.params.id);
    if (req.session.userId !== post.user_id) {
        res.redirect('/');
        return;
    }
    res.render('delete', { loggedIn: req.session.loggedIn, postTitle: post.title, postContent: post.content });
})

router.get('/dashboard', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    const currentUser = await User.findByPk(req.session.userId);
    const postData = await BlogPost.findAll({
        where: {
            user_id: req.session.userId
        },
        include: [
            {
                model: Comment,
            }]
    });
    userPosts = postData.map((post) =>
        post.get({ plain: true }));
    res.render('dashboard', { loggedIn: req.session.loggedIn, sessionName: currentUser.username, userPosts });
})
module.exports = router;