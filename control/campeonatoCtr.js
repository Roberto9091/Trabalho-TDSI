var campeonato = require('../model/campeonato')

//middleware para buscar campeonatos
function getCampeonatos(req,res,next){
    campeonato.find({}).lean().exec(function(err,docs){
        req.campeonatos = docs
        next()
    })
}

function listar(req,res){
    campeonato.find({}).lean().exec(function(err,docs){
        res.render('campeonato/list.ejs',{"Campeonatos" : docs})
    })
}

function filtrar(req,res){
    campeonato.find({ nome : new RegExp(req.body.pesquisa, 'i') })
    .lean().exec(function(err,docs){
        res.render('campeonato/list.ejs',{"Campeonatos" : docs})
    })
}

function abrirAdiciona(req,res){
    res.render("campeonato/add.ejs")
}

function adiciona(req,res){
    var novoCampeonato = new campeonato({
        nome: req.body.nome
    })
    novoCampeonato.save(function(err){
        if(err){
            campeonato.find({}).lean().exec(function(err,docs){
                res.render('campeonato/list.ejs', { msg: "Problema ao salvar!", Campeonatos: docs })
            })            
        }else{
            campeonato.find({}).lean().exec(function(err,docs){
                res.render('campeonato/list.ejs', { msg: "Adicionado com sucesso!", Campeonatos: docs })
            })   
        }
    })
}

function abrirEdita(req,res){
    campeonato.findById(req.params.id,function(err,campeonato){
        res.render('campeonato/edit.ejs',{'campeonato':campeonato});
    })    
}

function edita(req,res){
    campeonato.findByIdAndUpdate(req.params.id, {nome:req.body.nome},function(err){
        if(err){
            campeonato.find({}).lean().exec(function(err,docs){
                res.render('campeonato/list.ejs', { msg: "Problema ao editar!", Campeonatos: docs })
            })            
        }else{
            campeonato.find({}).lean().exec(function(err,docs){
                res.render('campeonato/list.ejs', { msg: "Editado com sucesso!", Campeonatos: docs })
            })   
        }
    })
}

function deleta(req,res){
    campeonato.findByIdAndDelete(req.params.id,function(){
        campeonato.find({}).lean().exec(function(err,docs){
            res.render('campeonato/list.ejs', { msg: "Removido com sucesso!", Campeonatos: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getCampeonatos
}