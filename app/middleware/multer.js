const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Math.floor(Math.random() * 99999999)}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const supportedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (supportedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        message: 'Unsupported file format. Picture must be either jpg, jpeg, or png',
      },
      false,
    );
  }
};

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter,
});

module.exports = uploadMiddleware;
