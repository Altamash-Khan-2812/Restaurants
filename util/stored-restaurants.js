const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "restaurants.json");

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

function updatedRestaurantsList(restaurant) {
  fs.writeFileSync(filePath, JSON.stringify(restaurant));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  updatedRestaurantsList: updatedRestaurantsList,
};
