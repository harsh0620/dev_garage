const mongoose =require('mongoose')


const LogSchema=new mongoose.Schema({

    body:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model('Log',LogSchema)