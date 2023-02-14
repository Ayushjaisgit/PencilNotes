const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


const mongoURI = "mongodb://localhost:27017/?tls=false&readPreference=primary&directConnection=true"


const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports = connectToMongo;
