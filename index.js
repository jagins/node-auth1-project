const express = require('express');

const helmet = require('helmet');

const userRouter = require('./users/userRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api', userRouter);

server.get('/', (req, res) =>
{
    res.json({message: 'Its working'});
})

const PORT = 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));