// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
// 定義首頁路由
router.get('/', (req, res) => {
  const sort = req.query.sort
  let sortingMethod = {}

  switch (sort) {
    case 'A->Z':
      sortingMethod = { name: 'asc' }
      break;
    case 'Z->A':
      sortingMethod = { name: 'desc' }
      break;
    case '類別':
      sortingMethod = { category: 'asc' }
      break;
    case '地區':
      sortingMethod = { location: 'asc' }
      break;
  }

  Restaurant.find()
    .lean()
    .sort(sortingMethod)
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// 搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(
        data => data.name.toLowerCase().includes(keyword) || data.category.includes(keyword))
      res.render('index', { restaurants: filteredRestaurants, keyword })
    })
    .catch(error => console.log(error))
})




// 匯出路由模組
module.exports = router