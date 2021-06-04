const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();
router.get('/', async (req, res) => {
   const postData = await Post.findAll({ include: User });
   const posts = postData.map((post) => post.get({ plain: true }));
   res.render('homepage', {
      logged_in: true,
      posts: posts,
   });
});
module.exports = router;
