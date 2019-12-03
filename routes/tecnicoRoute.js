var express = require('express')
var route = express.Router()
var tecnicoCtr = require('../control/tecnicoCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',tecnicoCtr.gettecnicos, tecnicoCtr.listar)

//rota para listar todos
route.get('/', tecnicoCtr.listar)

//rota para listar por filtro
route.post('/', tecnicoCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', tecnicoCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), tecnicoCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', tecnicoCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), tecnicoCtr.edita)

//rota para deletar
route.get('/del/:id', tecnicoCtr.deleta)

module.exports = route;