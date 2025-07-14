const express = require ('express')
const app = express()
const expressLayouts = require ('express-ejs-layouts')
require('dotenv').config();
const PORT = process.env.PORT || 3000;
console.log(`Server running on port ${PORT}`);

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(PORT)