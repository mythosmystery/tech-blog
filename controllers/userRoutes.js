const e = require('express');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

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
