const express = require('express');
const passport =require('passport');
const router = express.Router()


/**
 *  @description Auth with Goolge
 *  @method GET /auth/google
 */
router.get('/google',passport.authenticate('google',{scope:['profile']}))

/**
 *  @description Google auth Callback
 *  @method GET /auth/google/callback
 */
router.get('/google/callback',passport.authenticate('google',{failureRedirect: '/login'}),

(req,res)=>{
    res.redirect('/dashboard')
})

/**
 *  @description Logout
 *  @method GET /auth/logout
 */
 router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
})

module.exports = router