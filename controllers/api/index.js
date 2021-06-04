const router = require('express').Router();
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');
const commentroutes = require('./comment-routes');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentroutes);

module.exports = router;
