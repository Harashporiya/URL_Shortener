const {getUser} = require("../URL_Shortener/services/auth")
async function restrictToLoggedinUserOnly(req,res,next){
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/login")
     const user = getUser(userUid);

     if(!user) return res.redirect("/login")

     res.user = user
     next();
}

async function checkAuth(req, res, next){
    const userUid = req.cookies?.uid;

 
     const user = getUser(userUid);

    

     res.user = user
     next();
}

module.exports={
    restrictToLoggedinUserOnly,
    checkAuth,
}