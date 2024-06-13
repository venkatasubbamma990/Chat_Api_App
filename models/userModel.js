const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
   temp_password : {
      type : String,
      
   },
   sessionToken : {
    type : String,
    default : ''
   }

})

const User = mongoose.model('users' , userSchema)

module.exports = User;