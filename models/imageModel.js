// SINGLE IMAGE SCHEMA

const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  file_path: {
    type: String,
  },
});

module.exports = mongoose.model("ImageModel", ImageSchema);

// MULTIPLE IMAGE SCHEMA

// const mongoose = require("mongoose");

// const ImageSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   images: [
//     {
//       data: String,
//       contentType: String,
//     },
//   ],
//   file_path: {
//     type: String,
//   },
// });

// module.exports = mongoose.model("ImageModel", ImageSchema);
