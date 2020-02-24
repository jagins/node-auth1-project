const database = require('../data/db-config');

function addUser(user)
{
    return database('users').insert(user, 'id')
    .then(ids =>
    {
        const [id] = ids;
        return findUserById(id)
    })
}

function findUserById(id)
{
    return database('users')
        .select('id', 'username')
        .where({id})
        .first();
}

function findUser(user)
{
    return database('users').select('id', 'username', 'password').where(user)
}

function find()
{

}

module.exports = {
    addUser,
    findUserById,
    findUser,
    find
}