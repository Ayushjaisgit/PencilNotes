const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


const mongoURI = "mongodb+srv://ayushjaiswaldeviic:Ayushmongoiic@cluster1ith.kczmqf1.mongodb.net/test1"


const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports = connectToMongo;
