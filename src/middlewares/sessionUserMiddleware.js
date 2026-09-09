const session_user_middleware = (req,res,next)=>{
    req.session.user = {
    id: req.User._id,
    role: req.User.role
  }

  next();
}

module.exports = session_user_middleware;