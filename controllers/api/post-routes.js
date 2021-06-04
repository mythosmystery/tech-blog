const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();
router.get('/', async (req, res) => {
   try {
      const posts = await Post.findAll({
         include: [{ model: User }],
      });
      res.status(200).json(posts);
   } catch (err) {
      res.status(400).json(err);
   }
});
module.exports = router;
