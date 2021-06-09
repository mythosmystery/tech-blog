const e = require('express');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

router.get('/view/:id', async (req, res) => {
   const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: User }],
   });
   const post = postData.get({ plain: true });
   res.render('viewPost', { ...post, logged_in: req.session.logged_in });
});

router.get('/add', withAuth, async (req, res) => {
   res.render('addPost');
});

router.get('/update/:id', withAuth, async (req, res) => {
   const post = await Post.findByPk(req.params.id, { raw: true });
   res.render('updatePost', { ...post });
});

router.get('/delete/:id', async (req, res) => {
   await Post.destroy({ where: { id: req.params.id, user_id: req.session.user_id } });
   res.redirect('/dashboard');
});

router.post('/add', async (req, res) => {
   const postData = await Post.create({ ...req.body, user_id: req.session.user_id });
   res.redirect('/dashboard');
});

router.post('/update/:id', async (req, res) => {
   await Post.update(req.body, { where: { id: req.params.id, user_id: req.session.user_id } });
   res.redirect('/dashboard');
});

module.exports = router;
