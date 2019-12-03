var jogador = require('../model/jogador')
var time = require('../model/time')
var campeonato = require('../model/campeonato')
var tecnico = require('../model/tecnico')

//middleware para buscar jogadores
function getJogador(req, res, next) {
    jogador.find({}).lean().exec(function (err, docs) {
        req.jogadores = docs
        next()
    })
}

function listar(req, res) {
    jogador
        .find({})
        .populate('campeonato')
        .populate('time')
        .populate('tecnicos')
        .lean()
        .exec(function (err, docs) {
            console.log(docs)
            res.render('jogador/list.ejs', { "Jogadores": docs })
        })
}

function filtrar(req, res) {
    jogador
        .find({ titulo: new RegExp(req.body.pesquisa, 'i') })
        .populate('campeonato')
        .populate('time')
        .populate('tecnicos')
        .lean()
        .exec(function (err, docs) {
            res.render('jogador/list.ejs', { "Jogadores": docs })
        })
}

function abrirAdiciona(req, res) {
    time
        .find({})
        .lean()
        .exec(function (e, times) {
            tecnico
                .find({})
                .lean()
                .exec(function (e, tecnicos) {
                    campeonato
                        .find({})
                        .lean()
                        .exec(function (e, campeonatos) {
                            res.render("jogador/add.ejs", { "Times": times, "Tecnicos": tecnicos, "Campeonatos": campeonatos })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoJogador = new jogador({
        nome: req.body.nome,
        numero: req.body.numero,
        posicao: req.body.posicao,
        foto: req.file.filename,
        campeonato: req.body.campeonato,
        time: req.body.time,
        tecnicos: req.body.tecnicos,
    })
    novoJogador.save(function (err) {
        if (err) {
            jogador.find({}).populate('campeonato').populate('time').populate('tecnicos').lean().exec(function (err, docs) {
                res.render('jogador/list.ejs', { msg: "Problema ao salvar!", Jogadores: docs })
            })
        } else {
            jogador.find({}).populate('campeonato').populate('time').populate('tecnicos').lean().exec(function (err, docs) {
                res.render('jogador/list.ejs', { msg: "Adicionado com sucesso!", Jogadores: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    time.find({}).lean().exec(
        function (e, times) {
            tecnico.find({}).lean().exec(
                function (e, tecnicos) {
                    campeonato.find({}).lean().exec(
                        function (e, campeonatos) {
                            jogador.findOne({ _id: req.params.id }).populate('campeonato').populate('time').populate('tecnicos').exec(
                                function (err, jogador) {
                                    res.render('jogador/edit.ejs', { 'jogador': jogador, "Times": times, "Autores": tecnicos, "Campeonatos": campeonatos });
                                });
                        });
                });
        });
}

function edita(req, res) {
    jogador.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            numero: req.body.numero,
            posicao: req.body.posicao,
            foto: req.file.filename,
            campeonato: req.body.campeonato,
            time: req.body.time,
            tecnicos: req.body.tecnicos
        }, function (err) {
            if (err) {
                jogador.find({}).populate('campeonato').populate('time').populate('tecnicos').lean().exec(function (err, docs) {
                    res.render('jogador/list.ejs', { msg: "Problema ao editar!", Jogadores: docs })
                })
            } else {
                jogador.find({}).populate('campeonato').populate('time').populate('tecnicos').lean().exec(function (err, docs) {
                    res.render('jogador/list.ejs', { msg: "Editado com sucesso!", Jogadores: docs })
                })
            }
        })
}

function deleta(req, res) {
    jogador.findByIdAndDelete(req.params.id, function () {
        jogador.find({}).populate('campeonato').populate('time').populate('tecnicos').lean().exec(function (err, docs) {
            res.render('jogador/list.ejs', { msg: "Removido com sucesso!", Jogadores: docs })
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
    getJogador
}