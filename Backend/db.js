const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


const mongoURI = "mongodb+srv://ayushjaiswaldeviic:Ayushmongoiic@cluster1ith.kczmqf1.mongodb.net/test1"


const connectToMongo = ()=>{
    mongoose.connect(mongoURI, (err, res)=>{
        if(err){
            setTimeout( () => connectToMongo() , 3000)
        }
        console.log("connected to mongo successfully");
    })
}

connectToMongo();

module.exports = connectToMongo;
