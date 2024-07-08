const express = require("express");
const bodyParser = require("body-parser");
const indexRoutes = require("./routes/index");
const patientRoutes = require("./routes/patients");
const doctorRoutes = require("./routes/doctors");

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Route setup
app.use("/", indexRoutes);
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
