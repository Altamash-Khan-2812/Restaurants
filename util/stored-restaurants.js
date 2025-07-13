function getStoredRestaurants() {
  const filePath = path.join(__dirname, "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const restaurantsList = JSON.parse(fileData);
  
  return restaurantsList
}
