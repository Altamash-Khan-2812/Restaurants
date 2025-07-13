const path = require("path");
const fs = require("fs");

const express = require("express");
const uuid = require("uuid");
const {
  getStoredRestaurants,
  updatedRestaurantsList,
} = require("./util/stored-restaurants");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  // const filePath = path.join(__dirname, "restaurants.json");
  // const fileData = fs.readFileSync(filePath);
  // const storedRestaurants = JSON.parse(fileData);
  const storedRestaurants = getStoredRestaurants();
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = getStoredRestaurants();

  const selectedRestaurant = storedRestaurants.find(
    (r) => r.id === restaurantId
  );
  if (selectedRestaurant) {
    return res.render("restaurant-detail", { restaurant: selectedRestaurant });
  }
  res.status(404).render("404");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = getStoredRestaurants();

  restaurants.push(restaurant);

  updatedRestaurantsList(restaurants);

  res.redirect("/confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
