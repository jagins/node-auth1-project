
function PrivateRoute(req, res, next)
{
  if(req.session && req.session.loggedIn)
  {
    next();
  }
  else
  {
    res.status(401).json({message: 'You are not logged in'});
  }
}

module.exports = {
    PrivateRoute
}