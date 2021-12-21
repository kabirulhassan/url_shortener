require('dotenv').config();
const mongoose = require('mongoose');

const mongoUserName = process.env.MONGOUSERNAME;
const mongoPassword = process.env.MONGOPASSWORD;
const dbName = process.env.DBNAME;
const mongourl = "mongodb+srv://"+mongoUserName+":"+mongoPassword+"@cluster0.esnm5.mongodb.net/"+dbName+"?retryWrites=true&w=majority";
const db = mongourl;

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log('MongoDB Connected...');
    }
    
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
