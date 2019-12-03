const conexao = require('./conexao')

var campeonato = conexao.Schema({
    nome:{
        type:String
    },
    jogadores:[
        {
            type:conexao.Schema.Types.ObjectId,
            ref:"jogador"
        }
    ]
})

module.exports = conexao.model("campeonato",campeonato)