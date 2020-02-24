const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

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

router.post('/login', (req, res) =>
{
    const {username, password} = req.body;
    
    Users.findUser({username}).first()
    .then(user =>
    {
        if(user && bcrypt.compareSync(password, user.password))
        {
            res.status(200).json({message: `Welcome ${user.username}`});
        }
        else
        {
            res.status(401).json({message: 'YOU SHALL NOT PASS!'});
        }
    })
    .catch(error =>
    {
        res.status(500).json({error: 'Unable to connect to the database'});
    })
})

module.exports = router;