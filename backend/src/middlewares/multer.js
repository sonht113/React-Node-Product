const multer = require('multer');
const path = require('path');

let storage;
// eslint-disable-next-line prefer-const
storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/public/upload/images/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

module.exports = multer({ storage, fileFilter: imageFilter });
