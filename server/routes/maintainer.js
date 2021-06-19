const express = require('express');
const router = express.Router()
const {ensureAuth} =require('../middleware/auth')

const Maintainer =require('../model/Maintainer');


/**
 *  @description maintainers
 *  @method GET /dashboard/maintainer
 */
 router.get('/',ensureAuth,async (req,res)=>{
  
    try {      
        const maintainers=await Maintainer.find({user:req.user.id}).lean()        
        res.render('maintainer',{ 
            name: req.user.firstName,
            image:req.user.image,
            maintainers});
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})


/**
 *  @description Process add form
 *  @method POST /dashboard/maintainers
 */
 router.post('/',ensureAuth,async (req,res)=>{
    try {
        req.body.user=req.user.id
        await Maintainer.create(req.body)
        res.redirect('/dashboard/maintainer');
    } catch (err) {
        console.error(err);
        res.render('error/500');
        
    }
})

/**
 *  @description Update maintainer
 *  @method PUT /dashboard/maintainer
 */
 router.put('/:id',ensureAuth,async (req,res)=>{
    try {
        let maintainers=await Maintainer.findById(req.params.id).lean()

    if(!maintainers)
    {
        return res.render('error/404');
    }
    if(maintainers.user!=req.user.id)
    {
        res.redirect('/');
    }else{
        console.log(req.body);
        maintainers=await Maintainer.findByIdAndUpdate({_id: req.params.id},req.body,{
            new:true,
            runValidators: true
        })
        res.redirect('/dashboard/maintainer');
    }
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
  
})


/**
 *  @description Delete maintainers
 *  @method DELETE /dashboard/maintainers/:id
 */
 router.delete('/:id',ensureAuth,async (req,res)=>{
  
    try {
        await Maintainer.remove({_id:req.params.id})
        res.redirect('/dashboard/maintainer');
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})

module.exports = router