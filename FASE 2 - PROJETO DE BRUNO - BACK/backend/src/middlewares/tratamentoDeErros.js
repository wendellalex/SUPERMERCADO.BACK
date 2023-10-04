const ErroHandle = require("./ErroHandle")

function tratamentoDeErros(error, req, res, next) {
    if(error instanceof ErroHandle){
        return res.status(error.status).json({
            mensagem: error.mensagem
        })
    }
    return res.status(500).json({
        mensagem: "Erro no servidor"
    })
}

module.exports = tratamentoDeErros