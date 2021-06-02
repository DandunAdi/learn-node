const http = require("http");

const server = http.createServer((req, res) => {
  console.log("request has been made!");
});

server.listen(3000, "localhost", () => {
  console.log("listening request on port 3000");
});
