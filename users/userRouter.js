const express = require('express');

const Users = require('./users-model');

const router = express.Router();

router.get('/users', (req, res) =>
{
    Users.find()
    .then(users =>
    {
        res.status(200).json(users);
    })
    .catch(error =>
    {
        res.status(500).json({error: 'Unable to connect to the database'});
    })
})

module.exports = router;