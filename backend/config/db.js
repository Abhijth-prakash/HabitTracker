const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MongoUrl)
        console.log('mongodb connected')
    }
    catch(error){
        console.log(error)
    }
}

module.exports= {connect}