const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        lowercase:true,
        trim: true
    },
    short_description:{
        type:String,
        trim :true
    },
    description:{
        type:String,
        trim:true
    },
    profile_image:{
        type:String,
        trim:true
    },
    featured_image:{
        type:String,
        trim:true
    },
    category:{
        type:ObjectId,
        ref: 'Category'
    },
    subcategory:{
        type:String,
        trim:true,
        lowercase:true
    },
    tag:{
        type:[ObjectId],
        ref:'Tag'
    }

})


module.exports = mongoose.model('Post',postSchema)