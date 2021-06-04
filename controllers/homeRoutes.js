//const { User, Post } = require('../../models');
//const withAuth = require("../../utils/auth");
const router = require('express').Router();
router.get('/', (req, res) => {
    res.render('homepage');
});
module.exports = router;