const express = require("express");
const router = express.Router();

const uuid = require("uuid");
const {
  getStoredRestaurants,
  updatedRestaurantsList,
} = require("../util/stored-restaurants");

router.get("/restaurants", function (req, res) {
  const storedRestaurants = getStoredRestaurants();
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

router.get("/restaurants/:id", function (req, res) {
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

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = getStoredRestaurants();

  restaurants.push(restaurant);

  updatedRestaurantsList(restaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
