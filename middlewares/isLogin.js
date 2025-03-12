const isLogin = (req, res, next)=>{
if(req.cookies.token == "authenticated"){
    next()
}else{
res.json({msg: "You are not logged in"})
}
}

module.exports = isLogin;