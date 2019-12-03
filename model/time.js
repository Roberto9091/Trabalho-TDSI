const conexao = require('./conexao')

var time = conexao.Schema({
    nome:{
        type:String
    },
    estadio:{
        type:String
    },
    datafundacao:{
        type:Date
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("time",time)