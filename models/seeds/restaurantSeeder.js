const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require("../../restaurant.json").results
const db = mongoose.connection


mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })


db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantList)
})