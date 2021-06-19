const express = require('express');
const router = express.Router()
const {ensureAuth,ensureGuest} =require('../middleware/auth')


const Bookmark =require('../model/Bookmark');
const Stats =require('../model/Stats');



/**
 *  @description Home
 *  @method GET /
 */
 router.get('/',ensureGuest,(req,res)=>{
    res.render('index');
})
/**
 *  @description Root Route Login/Landing page
 *  @method GET /
 */
router.get('/login',ensureGuest,(req,res)=>{
    res.render('login');
})

/**
 *  @description Dashboard
 *  @method GET /dashboard
 */
 router.get('/dashboard',ensureAuth,async (req,res)=>{
        
    try {
        const bookmarks=await Bookmark.find({user:req.user.id}).lean()        
        const stats=await Stats.find({user:req.user.id}).lean()     
        res.render('dashboard',{ 
            name: req.user.firstName,
            image:req.user.image,
            user:req.user._id,
            bookmarks,
            stats});
    } catch (err) {
        console.error(err);
        res.render('error/500')
    } 
})

/**
 *  @description Process Bookmark add form
 *  @method POST /dashboard/
 */
 router.post('/dashboard',ensureAuth,async (req,res)=>{
    try {
        req.body.user=req.user.id
        await Stats.create(req.body)
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
        
    }
})
/**
 *  @description Delete bookmarks
 *  @method DELETE /dashboard/:id
 */
 router.delete('/dashboard/:id',ensureAuth,async (req,res)=>{
  
    try {
        await Bookmark.remove({_id:req.params.id})

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})

// @desc    Show add page
// @route   GET /dashboard/add_bookmark
router.get('/dashboard/add_bookmark', ensureAuth, (req, res) => {
    res.render('components/bookmark_add',{
        name: req.user.firstName,
            image:req.user.image,
    })
})

// @desc    Show add page
// @route   POST /dashboard/add_bookmark
router.post('/dashboard/add_bookmark', ensureAuth,async (req, res) => {
    try {
        req.body.user=req.user.id
        await Bookmark.create(req.body)
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
        
    }
})


/**
 *  @description Codefeed page
 *  @method GET /dashboard/codefeed
 */
 router.get('/dashboard/codefeed',ensureAuth,(req,res)=>{
    res.render('codefeed',{
        name: req.user.firstName,
            image:req.user.image,
    });
})
module.exports = router