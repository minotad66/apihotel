'use strict'

const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')

const initPostRouter = require('./routes/hotels')

const app = express()

app.use(bodyParse.json())
app.use(cors())

function initApp () {
  
  initPostRouter(app)

  return app
}

module.exports = initApp
