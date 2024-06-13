const File = require("../models/fileModels");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;

    console.log("File aa gyi->", file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    file.mv(path, (err) => {
      console.log(err);
    });

    res.status(200).json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

function isFileTypeSupport(type,supportedTypes){

  return supportedTypes.includes(type);

}

async function uploadFileToCloudinary(file,folder){
  const options = {folder};

  return await cloudinary.uploader.upload(file.tempFilePath,options)
}


exports.imageUpload = async(req,res)=>{
  try{

    const {name,tags,email} = req.body;
    // console.log(name,tags,email)

    const file = req.files.imageFile
    // console.log(file)

    //Validation
    const supportedTypes = ["jpg","jpeg","png"]
    const fileType = file.name.split(".")[1].toLowerCase();

    console.log(fileType)

    if(!isFileTypeSupport(fileType,supportedTypes)){

      return res.status(400).json({
        success:false,
        message:"File type not supported"
      })

    }

    const response = await uploadFileToCloudinary(file,"Gallery")
    console.log(response);


    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url
    })

    res.status(200).json({
      success:true,
      
      message:"File uploaded successfully"
    })










  } catch(error){
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}




