var mongoose = require('mongoose')
const estadio = "mongodb://localhost:27017/biblioteca"

mongoose.connect(estadio, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

module.exports = mongoose