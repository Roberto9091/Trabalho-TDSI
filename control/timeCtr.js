var time = require('../model/time')


//middleware para buscar times
function getTimes(req, res, next) {
    time.find({}).lean().exec(function (err, docs) {
        req.times = docs
        next()
    })
}

function listar(req, res) {
    time.find({}).lean().exec(function (err, docs) {
        res.render('time/list.ejs', { "Times": docs })
    })
}

function filtrar(req, res) {
    time.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('time/list.ejs', { "Times": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("time/add.ejs")
}

function adiciona(req, res) {
    var novoTime = new time({
        nome: req.body.nome,
        estadio: req.body.estadio,
        datafundacao: req.body.datafundacao,
        foto: req.file.filename
    })
    novoTime.save(function (err) {
        if (err) {
            time.find({}).lean().exec(function (err, docs) {
                res.render('time/list.ejs', { msg: "Problema ao salvar!", Times: docs })
            })
        } else {
            time.find({}).lean().exec(function (err, docs) {
                res.render('time/list.ejs', { msg: "Adicionado com sucesso!", Times: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    time.findById(req.params.id, function (err, time) {
        res.render('time/edit.ejs', { 'time': time });
    })
}

function edita(req, res) {
    time.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            estadio: req.body.estadio,
            datafundacao: req.body.datafundacao,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                time.find({}).lean().exec(function (err, docs) {
                    res.render('time/list.ejs', { msg: "Problema ao editar!", Times: docs })
                })
            } else {
                time.find({}).lean().exec(function (err, docs) {
                    res.render('time/list.ejs', { msg: "Editado com sucesso!", Times: docs })
                })
            }
        })
}

function deleta(req, res) {
    time.findByIdAndDelete(req.params.id, function () {
        time.find({}).lean().exec(function (err, docs) {
            res.render('time/list.ejs', { msg: "Removido com sucesso!", Times: docs })
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
    getTimes
}