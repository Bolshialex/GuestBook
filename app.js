import express from "express";
import colors from "colors";

const app = express();

app.use(express.static("public"));

const PORT = 3030;

app.get("/", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.listen(PORT, () => {
  console.log(PORT, `Server is running at http://localhost:${PORT}`.bgBlue);
});
