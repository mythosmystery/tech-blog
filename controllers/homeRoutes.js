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
   }
});

module.exports = router;
