var tecnico = require('../model/tecnico')


//middleware para buscar tecnicoes
function getTecnicos(req, res, next) {
    tecnico.find({}).lean().exec(function (err, docs) {
        req.tecnicos = docs
        next()
    })
}

function listar(req, res) {
    tecnico.find({}).lean().exec(function (err, docs) {
        res.render('tecnico/list.ejs', { "Tecnicos": docs })
    })
}

function filtrar(req, res) {
    tecnico.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('tecnico/list.ejs', { "Tecnicos": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("tecnico/add.ejs")
}

function adiciona(req, res) {
    var novoTecnico = new tecnico({
        nome: req.body.nome,
        nacionalidade: req.body.nacionalidade,
        datanasc: req.body.datanasc,
        foto: req.file.filename
    })
    novoTecnico.save(function (err) {
        if (err) {
            tecnico.find({}).lean().exec(function (err, docs) {
                res.render('tecnico/list.ejs', { msg: "Problema ao salvar!", Tecnicos: docs })
            })
        } else {
            tecnico.find({}).lean().exec(function (err, docs) {
                res.render('tecnico/list.ejs', { msg: "Adicionado com sucesso!", Tecnicos: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    tecnico.findById(req.params.id, function (err, tecnico) {
        res.render('tecnico/edit.ejs', { 'tecnico': tecnico });
    })
}

function edita(req, res) {
    tecnico.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            nacionalidade: req.body.nacionalidade,
            datanasc: req.body.datanasc,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                tecnico.find({}).lean().exec(function (err, docs) {
                    res.render('tecnico/list.ejs', { msg: "Problema ao editar!", Tecnicos: docs })
                })
            } else {
                tecnico.find({}).lean().exec(function (err, docs) {
                    res.render('tecnico/list.ejs', { msg: "Editado com sucesso!", Tecnicos: docs })
                })
            }
        })
}

function deleta(req, res) {
    tecnico.findByIdAndDelete(req.params.id, function () {
        tecnico.find({}).lean().exec(function (err, docs) {
            res.render('tecnico/list.ejs', { msg: "Removido com sucesso!", Tecnicos: docs })
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
    getTecnicos
}