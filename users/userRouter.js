const express = require('express');

const router = express.Router();

router.get('/users', (req, res) =>
{
    res.json({message: 'users endpoint'});
})

module.exports = router;