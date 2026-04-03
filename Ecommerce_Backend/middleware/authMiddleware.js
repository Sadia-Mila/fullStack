function authMiddleware(req, res, next) {
    if(req.session.isAuth){
        next()

    }
    else{
        res.json({ message: "UnAuthorized Access"})
    }
}

module.exports = authMiddleware