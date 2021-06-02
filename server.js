const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("request has been made!", req.url, req.method);

  res.setHeader("Content-Type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/":
      res.statusCode = 200;
      path += "index.html";
      break;
    case "/about":
      res.statusCode = 200;
      path += "about.html";
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      res.statusCode = 404;
      path += "404.html";
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err.message);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening request on port 3000");
});
