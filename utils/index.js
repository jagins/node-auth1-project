const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

function PrivateRoute(req, res, next)
{
    const { username, password } = req.headers;

  if (username && password)
  {
    Users.findUser({username})
      .first()
      .then(user => 
      {
        if (user && bcrypt.compareSync(password, user.password)) 
        {
          next();
        } else 
        {
          res.status(401).json({ message: "YOU SHALL NOT PASS" });
        }
      })
      .catch(({ name, message, stack }) => 
      {
        res.status(500).json({ name, message, stack });
      });
  } 
  else
  {
    res.status(400).json({ error: "please provide credentials" });
  }
}

module.exports = {
    PrivateRoute
}