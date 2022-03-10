const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增餐廳(如果把這段程式碼擺在/restaurants/:id 後面, new 會被當作是id進而找不到此路由)
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const newRestaurant = req.body
  Restaurant.create(newRestaurant)
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})
// 瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})


// 修改特定餐廳
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const editedRestaurant = req.body

  Restaurant.findOneAndUpdate({ _id: id }, editedRestaurant)
    .then(res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// 刪除特定餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router