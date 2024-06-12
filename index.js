const express = require("express");
const app = express();


const fileUploadRoutes = require("./routes/fileUploadRoutes")
require("dotenv").config();
const dbConnect = require("./config/database");

const cloudinaryConnect = require("./config/cloudinary");

const PORT = process.env.PORT || 5000

app.use(express.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//testing route
app.get("/",(req,res)=>{
    res.send(`<h1>This is the testing route</h1>`)

})

// mounting
app.use("/api/v1",fileUploadRoutes);

app.listen(PORT,()=>{
    console.log("App started successfully");
})

//db Connection 
dbConnect();
cloudinaryConnect();