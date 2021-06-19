const express = require('express');
const router = express.Router()
const {ensureAuth} =require('../middleware/auth')

const Todo =require('../model/Todo');

/**
 *  @description Dashboard
 *  @method GET /dashboard
 */
 router.get('/',ensureAuth,async (req,res)=>{
  
    try {
        const todos=await Todo.find({user:req.user.id}).lean()
      
        res.render('todos',{
            name: req.user.firstName,
            image:req.user.image,
            todos
        });
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})



/**
 *  @description Process add form
 *  @method POST /stories/add
 */
 router.post('/',ensureAuth,async (req,res)=>{
    try {
        req.body.user=req.user.id
        await Todo.create(req.body);
        res.redirect('/dashboard/todos');
    } catch (err) {
        console.error(err);
        res.render('error/500');
        
    }
})



/**
 *  @description todos
 *  @method PUT /dashboard/todos
 */
 router.put('/:id',ensureAuth,async (req,res)=>{
    try {
        let todos=await Todo.findById(req.params.id).lean()

    if(!todos)
    {
        return res.render('error/404');
    }
    if(todos.user!=req.user.id)
    {
        res.redirect('/');
    }else{
        todos=await Todo.findByIdAndUpdate({_id: req.params.id},req.body,{
            new:true,
            runValidators: true
        })
        res.redirect('/dashboard/todos');
    }
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
  
})


/**
 *  @description Delete todos
 *  @method DELETE /dashboard/todos/:id
 */
 router.delete('/:id',ensureAuth,async (req,res)=>{
  
    try {
        await Todo.deleteOne({_id:req.params.id})
        res.redirect('/dashboard/todos');
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
})



module.exports = router