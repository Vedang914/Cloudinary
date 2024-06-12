const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    .then(()=>{
        console.log("DB Connected Successfully")
    })
    .catch((error)=>{
        console.log("Issue in DB Connection");
        console.log(error);
        process.exit(1);
    })

}

module.exports = dbConnect;