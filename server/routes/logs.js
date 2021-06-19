const express = require('express');
const router = express.Router()
const {ensureAuth} =require('../middleware/auth')

const Log =require('../model/Log');
const Stats =require('../model/Stats');


/**
 *  @description Logs
 *  @method GET /dashboard/logs
 */
 router.get('/',ensureAuth,async (req,res)=>{
  
    try {
       
        const logs=await Log.find({user:req.user.id}).lean()        
        res.render('logs',{ 
            name: req.user.firstName,
            image:req.user.image,
            user:req.user._id,
            logs});
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})


/**
 *  @description Process add form
 *  @method POST /dashboard/logs
 */
 router.post('/',ensureAuth,async (req,res)=>{
    try {
        req.body.user=req.user.id
        await Log.create(req.body)
        res.redirect('/dashboard/logs');
    } catch (err) {
        console.error(err);
        res.render('error/500');
        
    }
})

/**
 *  @description Show logs edit page
 *  @method GET /dashboard/logs/edit/:id
 */
 router.get('/edit/:id',ensureAuth,async (req,res)=>{

    try {
        const logs=await Log.findOne({
            _id: req.params.id
        }).lean()
    
        if(!logs)
        {
            return res.render('error/404');
        }
        if(logs.user!=req.user.id)
        {
            res.redirect('/');
        }else{
            res.render('components/log_update',{
                name: req.user.firstName,
                image:req.user.image,
                logs,
            })
        }
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
    
})


/**
 *  @description Update logs 
 *  @method PUT /dashboard/logs/edit/:id
 */
 router.put('/:id',ensureAuth,async (req,res)=>{
    try {
        let logs=await Log.findById(req.params.id).lean()

    if(!logs)
    {
        return res.render('error/404');
    }
    if(logs.user!=req.user.id)
    {
        res.redirect('/');
    }else{
        console.log(req.body);
        logs=await Log.findByIdAndUpdate({_id: req.params.id},req.body,{
            new:true,
            runValidators: true
        })
        res.redirect('/dashboard/logs');
    }
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
  
})


/**
 *  @description Delete Logs
 *  @method DELETE /dashboard/logs/:id
 */
 router.delete('/:id',ensureAuth,async (req,res)=>{
  
    try {
        await Log.remove({_id:req.params.id})
        res.redirect('/dashboard/logs');
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})

module.exports = router