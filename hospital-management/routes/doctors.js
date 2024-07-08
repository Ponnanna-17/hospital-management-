const express = require("express");
const router = express.Router();
const db = require("../config");

router.get("/add", (req, res) => {
  res.render("add_doctor");
});

router.post("/add", (req, res) => {
  const { firstName, lastName, specialization, contactNumber } = req.body;
  const sql = `INSERT INTO Doctors (FirstName, LastName, Specialization, ContactNumber)
                 VALUES (?, ?, ?, ?)`;
  db.query(
    sql,
    [firstName, lastName, specialization, contactNumber],
    (err, result) => {
      if (err) throw err;
      res.redirect("/doctors");
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM Doctors";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("list_doctors", { doctors: results });
  });
});

router.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM Doctors WHERE DoctorID = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.render("edit_doctor", { doctor: result[0] });
  });
});

router.post("/edit/:id", (req, res) => {
  const { firstName, lastName, specialization, contactNumber } = req.body;
  const sql = `UPDATE Doctors SET FirstName = ?, LastName = ?, Specialization = ?, ContactNumber = ?
                 WHERE DoctorID = ?`;
  db.query(
    sql,
    [firstName, lastName, specialization, contactNumber, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.redirect("/doctors");
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const sql = "DELETE FROM Doctors WHERE DoctorID = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/doctors");
  });
});

module.exports = router;
