const express = require("express");

const app = express();
app.listen(3000);

app.get("/", (req, res) => {
  // res.send("<h1>Hello</h1>");
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

// Redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
