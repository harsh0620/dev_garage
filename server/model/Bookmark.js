const mongoose =require('mongoose')


const BookmarkSchema=new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    category:{
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

module.exports=mongoose.model('Bookmark',BookmarkSchema)