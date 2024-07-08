const express = require("express");
const router = express.Router();
const db = require("../config");

router.get("/add", (req, res) => {
  res.render("add_patient");
});

router.post("/add", (req, res) => {
  const { firstName, lastName, dob, gender, contactNumber, address } = req.body;
  const sql = `INSERT INTO Patients (FirstName, LastName, DateOfBirth, Gender, ContactNumber, Address)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [firstName, lastName, dob, gender, contactNumber, address],
    (err, result) => {
      if (err) throw err;
      res.send("New patient added");
    }
  );
});

module.exports = router;
