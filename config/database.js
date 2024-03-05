const mongoose = require('mongoose');
const connectDB = async ()=>{

    mongoose.connect('mongodb+srv://saninmuhammed9744:authentication1234@cluster0.wci7xfn.mongodb.net/store');
    const db = mongoose.connection
    db.on('error', console.error.bind(console, "connection error: "));
    db.once("open",()=> console.log("Database Connected Successfully"))
    
}

module.exports = connectDB;