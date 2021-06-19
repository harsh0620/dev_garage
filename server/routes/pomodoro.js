const express = require('express');
const router = express.Router()
const {ensureAuth} =require('../middleware/auth')



/**
 *  @description Get Pomodoro
 *  @method GET /dashboard/pomodoro
 */
 router.get('/',ensureAuth,async (req,res)=>{
  
    res.render('pomodoro',{
        name: req.user.firstName,
            image:req.user.image
    })
})



module.exports = router