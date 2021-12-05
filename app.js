const express = require('express');
const viewController= require('./controllers/viewController')
const app = express();
app.use(express.json())
app.use(viewController)


module.exports=app