const express = require('express')
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
const app = express()
var campeonatoRoute = require('./routes/campeonatoRoute')
var tecnicoRoute = require('./routes/tecnicoRoute')
var timeRoute = require('./routes/timeRoute')
var jogadorRoute = require('./routes/jogadorRoute')

app.use(cookieparser())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000,function(){
    console.log('O servidor esta funcionando!')
})

app.use('/campeonato',campeonatoRoute)
app.use('/tecnico',tecnicoRoute)
app.use('/time',timeRoute)
app.use('/jogador',jogadorRoute)