const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    fName:{
        type:String,
        required:true

    },
    lName:{
        type:String,
        required:true

    },
    role:{
        type:String,
        enum:['Admin','Editor','Viewer'],
        required:true
    },
    permission:{
        type:[String],
        enum:['Create','Read','Update','Delete']
    }

},{timestamps:true})


module.exports = mongoose.model('User3',userSchema)