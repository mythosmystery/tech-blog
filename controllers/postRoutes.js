const e = require('express');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();
router.get('/view/:id', async (req, res) => {
   const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: User }],
   });
   const post = postData.get({ plain: true });
   res.render('viewPost', { ...post });
});
