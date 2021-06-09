const e = require('express');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

router.post('/create/:id', withAuth, async (req, res) => {
   const commentData = await Comment.create({
      body: req.body.body,
      user_id: req.session.user_id,
      post_id: req.params.id,
   });
   res.redirect(`/posts/view/${req.params.id}`);
});

module.exports = router;
