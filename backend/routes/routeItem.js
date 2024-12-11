let express = require("express");
let modelItem = require("../models/modelItem");
let multer = require("multer");
let { v4: uuidv4 } = require("uuid");
let path = require("path");
let app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, fileFilter });

// CRUD => Create, Read, Update, Delete
// Create
app.post("/addItem", upload.single("photo"), async (req, res) => {
  try {
    let newItem = new modelItem({
      ...req.body,
      photo: req.file.filename,
    });
    await newItem.save();
    res.status(200).send(newItem);
  } catch (err) {
    res.status(500).send("Item not added " + err);
  }
});
// Read -read all elements
app.get("/readItems", async (req, res) => {
  try {
    let items = await modelItem.find({});
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send("Not read");
  }
});
// Read -read one element
app.get("/readItem/:id", async (req, res) => {
  try {
    let itemId = req.params.id;
    let item = await modelItem.findById({ _id: itemId });
    res.status(200).send(item);
  } catch (err) {
    res.status(500).send("Not read");
  }
});
// Delete
app.delete("/deleteItem/:id", async (req, res) => {
  try {
    let itemId = req.params.id;
    await modelItem.deleteOne({ _id: itemId });
    res.status(200).send("Deleted");
  } catch (err) {
    res.status(500).send("Not deleted");
  }
});

// update
app.patch("/updateItem/:id", upload.single("photo"), async (req, res) => {
  try {
    let itemId = req.params.id;
    let infoItem = { ...req.body };
    if (req.file) {
      infoItem.photo = req.file.filename;
    }
    let updatedItem = await modelItem.findByIdAndUpdate(
      { _id: itemId },
      { $set: infoItem },
      { new: true }
    );
    res.status(200).send(updatedItem);
  } catch (err) {
    res.status(500).send("Item not updated " + err);
  }
});
module.exports = app;
