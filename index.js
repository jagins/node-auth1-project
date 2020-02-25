const express = require('express');

const helmet = require('helmet');

const userRouter = require('./users/userRouter');

const authRouter = require('./auth/authRouter');

const {PrivateRoute} = require('./utils');

const session = require('express-session');
const knexStore = require('connect-session-knex')(session);
const knex = require('./data/db-config');

const server = express();

const sessionConfig = {
    name: 'session',
    secret: 'shh secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true
    },
    store: new knexStore({
        knex,
        tablename: 'sessions',
        createTable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 12
    })
}

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api', authRouter);
server.use('/api/restricted', PrivateRoute, userRouter);

server.get('/', (req, res) =>
{
    res.json({message: 'Its working'});
})

const PORT = 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));