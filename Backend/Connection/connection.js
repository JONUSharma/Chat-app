const express = require("express");
const mongoose = require("mongoose")

async function ConnectMongoDb(URL) {
    mongoose.connect(URL)
        .then(()=> console.log("mongodb connect succesfully ", URL))
        .catch ((err)=> console.log(err));
}

module.exports = {
    ConnectMongoDb
}