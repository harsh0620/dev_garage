const mongoose =require('mongoose')


const MaintainerSchema=new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    presents:{
        type: Number,
        required: true,
    },
   totalClasses:{
        type: Number,
        required: true,
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

module.exports=mongoose.model('Maintainer',MaintainerSchema)