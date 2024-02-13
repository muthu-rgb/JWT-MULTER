// UPLOAD SINGLE IMAGE

const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const ImageModel = require("../models/imageModel");

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
    const filePath = path.join("uploads", fileName);
    req.filePath = filePath;
  },
});

const upload = multer({
  storage: Storage,
}).single("singleImage");

router.get("/", (req, res) => {
  res.send("Upload file");
});

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new ImageModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/png",
        },
        file_path: req.filePath,
      });

      newImage
        .save()
        .then(() => res.send("Successfully Uploaded"))
        .catch((err) => console.log(err));
    }
  });
});

module.exports = router;

// UPLOAD MULTIPLE IMAGES

// const router = require("express").Router();
// const multer = require("multer");
// const path = require("path");
// const ImageModel = require("../models/imageModel");

// const Storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     const fileName =
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname);
//     cb(null, fileName);

//     const filePath = path.join("uploads", fileName);
//     req.filePath = filePath;
//   },
// });

// const upload = multer({
//   storage: Storage,
// }).array("multipleImage", 5);

// router.get("/", (req, res) => {
//   res.send("Upload file");
// });

// router.post("/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const images = req.files.map((file) => ({
//         data: file.filename,
//         contentType: file.mimetype,
//       }));

//       const newImage = new ImageModel({
//         name: req.body.name,
//         images: images,
//         file_path: req.filePath,
//       });

//       newImage
//         .save()
//         .then(() => res.send("Successfully Uploaded"))
//         .catch((err) => console.log(err));
//     }
//   });
// });

// module.exports = router;
