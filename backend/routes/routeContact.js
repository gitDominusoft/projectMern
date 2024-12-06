let express = require("express");
let app = express();
let modelContact = require("../models/modelContact");
// Post
app.post("/addContact", async (req, res) => {
  try {
    let newContact = new modelContact(req.body);
    await newContact.save();
    res.status(200).send(newContact);
  } catch (err) {
    res.status(500).send("Error add:" + err);
    console.log("Error add:" + err);
  }
});

module.exports = app;
