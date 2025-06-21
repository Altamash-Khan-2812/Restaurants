const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  const filePath = path.join(__dirname, "views", "index.html");
  res.sendFile(filePath);
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(filePath);
});

app.get("/recommend", function (req, res) {
  const filePath = path.join(__dirname, "views", "recommend.html");
  res.sendFile(filePath);
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  console.log(restaurant);
  const filePath = path.join(__dirname, "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const restaurantsList = JSON.parse(fileData);
  restaurantsList.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(restaurantsList));

  const confirmFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(confirmFilePath);
});

app.get("/about", function (req, res) {
  const filePath = path.join(__dirname, "views", "about.html");
  res.sendFile(filePath);
});

app.listen(3000);
