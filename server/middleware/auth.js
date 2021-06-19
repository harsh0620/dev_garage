const { authenticate } = require("passport")

module.exports ={

    // middleware for ensuring authentication
    ensureAuth: function (req,res,next)
    {
        if(req.isAuthenticated())
        {
            return next()
        }else{
            res.redirect('/')
        }
    },
     // middleware for ensuring Guest authentication
    ensureGuest: function(req,res,next)
    {
        if(req.isAuthenticated())
        {
            res.redirect('/dashboard')
        }else{
            return next()
        }
    }
    
    }