import express from "express";
import colors from "colors";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const PORT = 3030;

let contacts = [];

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/submit-info", (req, res) => {
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

  if (contact.fName.trim() === "") {
    res.send("<h1>Invalid First Name</h1>");
    return;
  }
  if (contact.lName.trim() === "") {
    res.send("<h1>Invalid Last Name</h1>");
    return;
  }
  if (contact.email.trim() === "") {
    res.send("<h1>Invalid Email</h1>");
    return;
  }

  contacts.push(contact);
  res.render("success", { contact });
});

app.get("/admin/contacts", (req, res) => {
  res.render("admin", { contacts });
});

app.listen(PORT, () => {
  console.log(PORT, `Server is running at http://localhost:${PORT}`.bgBlue);
});
