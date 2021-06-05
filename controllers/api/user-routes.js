const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

//the /api/users endpoint

router.get('/', async (req, res) => {
   try {
      const users = await User.findAll({
         include: [{ model: Post }, { model: Comment }],
      });
      res.status(200).json(users);
   } catch (err) {
      res.status(400).json(err);
   }
});

module.exports = router;
