const multer = require('multer');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("MIME type error.");
    if (isValid) {
      error = null;
    }

    callback(error, './BackEnd/public/images');
  },
  filename: (request, file, callback) => {
    const filename = file.originalname.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, filename + "_" + Date.now() + "." + ext);
  }
});

module.exports = multer({
  storage: storage
}).single('image');
