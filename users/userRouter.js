const express = require('express');

const bcrypt = require('bcryptjs');

const Users = require('./users-model');

const router = express.Router();

router.get('/users', (req, res) =>
{
    res.json({message: 'users endpoint'});
})

router.post('/register', (req, res) =>
{
    const user = req.body;

    if(!user.username || !user.password)
    {
        res.status(400).json({error: 'Please provide a username and password'});
    }
    else
    {
        const hashPassword = bcrypt.hashSync(user.password, 8);
        user.password = hashPassword;

        Users.addUser(user)
        .then(newUser =>
        {
            res.status(201).json(newUser);
        })
        .catch(error =>
        {
            res.status(500).json({error: 'Unable to save user to the database'});
        })
    }
})

module.exports = router;