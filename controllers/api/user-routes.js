//const { User, Post } = require('../../models');
//const withAuth = require("../../utils/auth");
const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('<h1>user api route</h1>')
})
module.exports = router;