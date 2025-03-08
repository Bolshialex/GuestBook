import express from "express";
import colors from "colors";
import { validation } from "./services/validation.js";
import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function connect() {
  try {
    const conn = await pool.getConnection();
    return conn;
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`);
  }
}

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const PORT = 3030;

let contacts = [];

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/submit-info", async (req, res) => {
  try {
    const conn = await connect();

    const contact = {
      fName: req.body.fName,
      lName: req.body.lName,
      jobTitle: req.body["job-title"],
      company: req.body.company,
      linkedIn: req.body["linked-in"],
      email: req.body.email,
      pastMeeting: req.body["past-meeting"],
      otherMeet: req.body["other-meet"],
      message: req.body.message,
      mailingList: req.body["mailing-list"],
      emailFormat: req.body["email-format"],
      timestamp: new Date().toLocaleString(),
    };
    const result = await validation(contact);
    console.log(result);
    if (result.isValid === false) {
      res.render("error", { result });
      return;
    }

    contact.mailingList === "yes"
      ? (contact.mailingList = true)
      : (contact.mailingList = false);

    const addTask = await conn.query(
      `INSERT INTO Contacts (fName, lName, jobTitle, company, linkedIn, email, pastMeeting, otherMeet, message, mailingList, emailFormat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        contact.fName,
        contact.lName,
        contact.jobTitle,
        contact.company,
        contact.linkedIn,
        contact.email,
        contact.pastMeeting,
        contact.otherMeet,
        contact.message,
        contact.mailingList,
        contact.emailFormat,
      ]
    );

    conn.release();
    res.render("success", { contact });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).send("An error occurred while creating contact.");
  }
});

app.get("/admin/contacts", async (req, res) => {
  try {
    const conn = await connect();

    const contacts = await conn.query(`SELECT * FROM Contacts`);

    res.render("admin", { contacts });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).send("An error occurred while creating contact.");
  }
});

app.listen(PORT, () => {
  console.log(PORT, `Server is running at http://localhost:${PORT}`.bgBlue);
});
