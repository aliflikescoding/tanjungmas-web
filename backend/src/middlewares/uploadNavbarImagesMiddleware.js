const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Ensure upload directory exists
const uploadDir = "./public/page/navbar";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileNameWithDashes = file.originalname.replace(/\s+/g, "-");
    cb(null, fileNameWithDashes);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadNavbarImagesMiddleware = (req, res, next) => {
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB in bytes
    },
  }).single("navbarImage");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File size too large. Maximum size is 10MB",
        });
      }
      return res.status(400).json({
        message: "Error uploading file",
        error: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        message: "Error uploading file",
        error: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Invalid file type. File must be jpg, jpeg, or png",
      });
    }

    next();
  });
};

module.exports = uploadNavbarImagesMiddleware;
