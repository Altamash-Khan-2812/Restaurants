const path = require("path");
const fs = require("fs");

const express = require("express");
const uuid = require("uuid");

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

app.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const restaurnatFilePath = path.join(__dirname, "restaurants.json");
  const fileData = fs.readFileSync(restaurnatFilePath);
  const restaurants = JSON.parse(fileData);
  const selectedRestaurant = restaurants.find((r) => r.id === restaurantId);
  if (selectedRestaurant) {
    return res.render("restaurant-detail", { restaurant: selectedRestaurant });
  }
  res.render("404");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
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

app.use(function (req, res) {
  res.render("404");
});

app.use(function (error, req, res, next) {
  res.render("500");
});

app.listen(3000);
