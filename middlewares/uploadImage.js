const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Format image tidak sesuai");
    error.status = 400;
    error.name = "Bad request";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};

module.exports = uploadImage;
