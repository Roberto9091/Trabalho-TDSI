var express = require('express')
var route = express.Router()
var campeonatoCtr = require('../control/campeonatoCtr')

// rota para listar todos usando middleware
//route.get('/',campeonatoCtr.getGeneros, campeonatoCtr.listar)
route.get('/',campeonatoCtr.getCampeonatos, campeonatoCtr.listar)

//rota para listar por filtro
route.post('/', campeonatoCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', campeonatoCtr.abrirAdiciona)

//rota para adicionar
route.post('/add', campeonatoCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', campeonatoCtr.abrirEdita)

//rota para editar
route.post('/edit/:id', campeonatoCtr.edita)

//rota para deletar
route.get('/del/:id', campeonatoCtr.deleta)

module.exports = route;