const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected successfully');
    }
    catch(error){
        console.error('Failed to connect database: ', error);
        process.exit(1);
    }
}

module.exports = connectDB;