var express = require('express')
var route = express.Router()
var timeCtr = require('../control/timeCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',timeCtr.gettimes, timeCtr.listar)

//rota para listar todos
route.get('/', timeCtr.listar)

//rota para listar por filtro
route.post('/', timeCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', timeCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), timeCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', timeCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), timeCtr.edita)

//rota para deletar
route.get('/del/:id', timeCtr.deleta)

module.exports = route;