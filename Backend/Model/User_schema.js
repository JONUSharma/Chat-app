const express = require("express");
const mongoose = require("mongoose")

const signup_Schema = new mongoose.Schema({
    fullname : {
        type: String,
    },
    username : {
        type: String,
        require : true,
        unique : true,
    },
    password: {
        type:String,
        require:true,
    },
    email : {
        type: String,
        require : true,
        unique : true,
    },
   avatar : {
    type : String,
    require : true
   },
   gender : {
    type : String,
    require : true
   },
   
    
    
})

const user = mongoose.model("User", signup_Schema);

module.exports = {user};