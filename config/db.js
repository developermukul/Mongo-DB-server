


const mongoose = require('mongoose')


const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.CONNECT_MONGODB_STRING)
    }catch(error){
        console.log(error);
    }
}


module.exports = connectMongoDB