const fs = require("fs");

// Writing files
fs.writeFile("./docs/blog1.txt", "Hello there!", () => {
  console.log("File was written!");
});

// Reading files
fs.readFile("./docs/blog1.txt", (err, data) => {
  if (err) return console.log(err.message);
  console.log(data.toString());
});

// Create Directory
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", () => {
    console.log("Folder created!");
  });
} else {
  fs.rmdir("./assets", () => {
    console.log("folder deleted");
  });
}

// Delete files
if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", () => {
    console.log("file deleted");
  });
}
