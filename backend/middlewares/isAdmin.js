const isAdmin =(req,res,next)=>{
 console.log(`is admin middleware: ${req.user ? req.user.role : 'undefined'}`);
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(401).json({ message: 'Access Denied: Admin Only' });
}
module.exports =isAdmin;