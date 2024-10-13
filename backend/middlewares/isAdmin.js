const isAdmin =(req,res,next)=>{
    console.log(`is admin middleware:${req.user}`)
    if(req.user&&req.user.role=== 'admin'){
        return next();
    }
    res.status(401).json({message:'Access Denied:Admin Only'})
}
module.exports ={isAdmin};