import express from "express";
import colors from "colors";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const PORT = 3030;

let contactTest = [];

app.get("/", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.post("/submit-info", (req, res) => {
  contactTest.push(req.body);
  res.send(
    `<h1>Thank you for submitting ${req.body.fName}. I will respond soon</h1>`
  );
});

app.get("/admin/contacts", (req, res) => {
  res.send(contactTest);
});

app.listen(PORT, () => {
  console.log(PORT, `Server is running at http://localhost:${PORT}`.bgBlue);
});
