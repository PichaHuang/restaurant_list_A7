const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
//const Restaurant = require('./models/restaurant')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')

const db = mongoose.connection


mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })


db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


app.use(bodyParser.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)


// 首頁,瀏覽全部餐廳
// 搬走了


// 新增餐廳(如果把這段程式碼擺在/restaurants/:id 後面, new 會被當作是id進而找不到此路由)
// 搬走了


// 瀏覽特定餐廳
// 搬走了


// 搜尋餐廳
// 搬走了


// 修改特定餐廳
// 搬走了


// 刪除特定餐廳
// 搬走了


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})