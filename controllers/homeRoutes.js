//const { User, Post } = require('../../models');
//const withAuth = require("../../utils/auth");
const router = require('express').Router();
router.get('/', (req, res) => {
   res.render('homepage', {
      logged_in: true,
      posts: [{ title: 'Post 1', body: 'Test post', user: { name: 'Test User' } }],
   });
});
module.exports = router;
