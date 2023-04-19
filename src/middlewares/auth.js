

const isAuthorized = (req,res,next) => {
    
    return res.redirect('/login')
    // next()

}

module.exports = isAuthorized