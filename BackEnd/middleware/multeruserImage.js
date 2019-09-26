const multer = require('multer');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    let mimeType = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Mime Type Error");
    if (mimeType) {
      error = null;
    }

    callback(error, './BackEnd/public/images/userImages');
  },
  filename: (request, file, callback) => {
    let filename = file.originalname.toLowerCase().split(' ').join('_');
    let ext = MIME_TYPE_MAP[file.mimetype];
    let finalName = filename + "_" + Date.now() + "." + ext;
    callback(null, finalName);
  }
});

module.exports = multer({
  storage: storage
}).single('image');
