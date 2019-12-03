const conexao = require('./conexao')

var jogador = conexao.Schema({
    nome:{
        type:String
    },
    numero:{
        type:String
    },
    posicao:{
        type:String
    },
    foto:{
        type:String
    },
    campeonato:{
        type:conexao.Schema.Types.ObjectId,
        ref: "campeonato"
    },
    time:{
        type:conexao.Schema.Types.ObjectId,
        ref: "time"
    },
    tecnicos:[{
        type:conexao.Schema.Types.ObjectId,
        ref: "tecnico"
    }]
})

module.exports = conexao.model("jogador",jogador)