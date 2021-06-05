const e = require('express');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

router.get('/', async (req, res) => {
   const postData = await Post.findAll({ include: User });
   const posts = postData.map((post) => post.get({ plain: true }));

   res.render('homepage', {
      logged_in: req.session.logged_in,
      posts: posts,
   });
});
router.get('/dashboard', withAuth, async (req, res) => {
   res.render('dashboard');
});
router.get('/viewPost/:id', async (req, res) => {
   const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: User }],
   });
   const post = postData.get({ plain: true });
   res.render('viewPost', { ...post });
});

router.get('/signup', async (req, res) => {
   res.render('signup');
});

router.get('/login', async (req, res) => {
   if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
   }
   res.render('login');
});

router.get('/logout', async (req, res) => {
   if (req.session.logged_in) {
      req.session.destroy(() => {
         res.redirect('/');
      });
   } else {
      res.redirect('/');
   }
});

router.post('/', async (req, res) => {
   try {
      const userData = await User.create(req.body);

      req.session.save(() => {
         req.session.user_id = userData.id;
         req.session.logged_in = true;
         res.redirect('/dashboard');
      });
   } catch (err) {
      res.status(400).json(err);
   }
});

router.post('/login', async (req, res) => {
   try {
      const userData = await User.findOne({ where: { email: req.body.email } });

      if (!userData) {
         res.status(400).json({ message: 'Incorrect email or password, please try again' });
         return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
         res.status(400).json({ message: 'Incorrect email or password, please try again' });
         return;
      }

      req.session.save(() => {
         req.session.user_id = userData.id;
         req.session.logged_in = true;

         res.redirect('/dashboard');
      });
   } catch (err) {
      res.status(400).json(err);
   }
});

module.exports = router;
