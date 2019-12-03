var express = require('express')
var route = express.Router()
var JogadorCtr = require('../control/jogadorCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',JogadorCtr.getLivros, JogadorCtr.listar)
route.get('/', JogadorCtr.listar)

//rota para listar por filtro
route.post('/', JogadorCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', JogadorCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), JogadorCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', JogadorCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), JogadorCtr.edita)

//rota para deletar
route.get('/del/:id', JogadorCtr.deleta)

module.exports = route;