const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const compressImage = async (req, res, next) => {

    if (req.files['files[]']) {

      try {
        // Iterate through each uploaded file
        for (let i = 0; i < req.files['files[]'].length; i++) {

          const file = req.files['files[]'][i]
          const filePath = file.path;
          const fileExt = path.extname(filePath);
          const compressedFilePath = filePath.replace(fileExt, '_compressed.jpg');
  
         

          await sharp(filePath)
            .resize({ width: 800 })
            .withMetadata() 
            .jpeg({ quality: 80 })
            .toFile(compressedFilePath);
  
          // Remove the original file from disk
          fs.unlinkSync(filePath);
  
          // Update the req.files array to point to the compressed file
          file.path = compressedFilePath;
          file.destination = path.dirname(compressedFilePath);
          file.filename = path.basename(compressedFilePath);

       
        }
      } catch (err) {
        return next(err);
      }
    }
    else if (req.files['image']) {
      try {
        // Iterate through each uploaded file
        for (let i = 0; i < req.files['image'].length; i++) {

          const file = req.files['image'][i]
          const filePath = file.path;
          const fileExt = path.extname(filePath);
          const compressedFilePath = filePath.replace(fileExt, '_compressed.jpg');
  
         

          await sharp(filePath)
            .resize({ width: 800 })
            .withMetadata() 
            .jpeg({ quality: 80 })
            .toFile(compressedFilePath);
  
          // Remove the original file from disk
          fs.unlinkSync(filePath);
  
          // Update the req.files array to point to the compressed file
          file.path = compressedFilePath;
          file.destination = path.dirname(compressedFilePath);
          file.filename = path.basename(compressedFilePath);

       
        }
      } catch (err) {
        return next(err);
      }
  }
  
    next();
  };
  

module.exports = compressImage;
