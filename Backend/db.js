const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


const mongoURI = "mongodb://localhost:27017/pencilnotes?tls=false&readPreference=primary&directConnection=true"


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
