const { port } = require("./config");
const express = require("express");
const app = express();
const myroutes = require("./project1routes");

app.use((req, res, next) => {
  console.log("Time:", new Date() + 3600000 * -5.0); // GMT-->EST
  next();
});

app.use(express.static("public"));

// parse application/json
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use("/api/p1/setup", myroutes);

app.use((err, req, res, next) => {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send("internal server error");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
