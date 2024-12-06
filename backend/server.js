let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const session = require("express-session");
let routeContact = require("./routes/routeContact");
let app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
  })
);
app.use(
  session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
// Duhet kjo qe te ruhen informacionet ne databaze
app.use(express.json({ limit: "1000mb", extended: true }));
mongoose
  .connect(
    "mongodb+srv://git:git@cluster0.h9uun.mongodb.net/ProjectMERN?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

app.use(routeContact);
app.use("/", (req, res) => {
  res.send("Hello");
});
app.listen("5000", () => {
  console.log("Server created");
});
