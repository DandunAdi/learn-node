const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

require("dotenv").config();

const app = express();

// Mongodb atlas connection
const dbURI = process.env.MONGODB_BLOGS_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

// Setup
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routing
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog Routing
app.use("/blogs", blogRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("404");
});
