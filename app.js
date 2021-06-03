const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

// Mongodb atlas connection
const dbURI =
  "mongodb+srv://banana:bananapie@learn-node.xjipg.mongodb.net/learn-node?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

// Setup
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static("public"));

// Routing
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog Routing
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("index", { title: "All Blogs", blogs: result })
    )
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

// 404
app.use((req, res) => {
  res.status(404).render("404");
});
