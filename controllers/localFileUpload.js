const File = require("../models/fileModels");

const localFileUpload = async (req, res) => {
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

module.exports = { localFileUpload };
