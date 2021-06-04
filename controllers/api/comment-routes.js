const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();
router.get('/', async (req, res) => {
   try {
      const posts = await Comment.findAll({
         include: [{ model: Post }, { model: User }],
      });
      res.status(200).json(posts);
   } catch (err) {
      res.status(400).json(err);
   }
});
module.exports = router;
