const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        trim:true
    },

})


module.exports = mongoose.model('Tag', tagSchema)