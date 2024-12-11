let mongoose = require("mongoose");

let itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    require: true,
  },
});

let Item = mongoose.model("Item", itemSchema);
module.exports = Item;
