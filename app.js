const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "restaurants.json");
  const restaurantsList = JSON.parse(fs.readFileSync(filePath));
  res.render("restaurants", {
    numberOfRestaurants: restaurantsList.length,
    restaurants: restaurantsList,
  });
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  console.log(restaurant);
  const filePath = path.join(__dirname, "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const restaurantsList = JSON.parse(fileData);
  restaurantsList.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(restaurantsList));

  res.redirect("/confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.listen(3000);
