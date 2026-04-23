function authMiddleware(req, res, next) {
  if (req.session && req.session.isAuth && req.session.user) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  }
}

module.exports = authMiddleware