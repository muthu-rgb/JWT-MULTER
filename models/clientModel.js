const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
},{
  timestamps: true
});

module.exports = mongoose.model("Client", clientSchema);
