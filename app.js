const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
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

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => res.redirect("/blogs"))
    .catch((err) => console.log(err));
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) =>
      res.render("details", { title: "Blog Details", blog: result })
    )
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
});

// 404
app.use((req, res) => {
  res.status(404).render("404");
});
