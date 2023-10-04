class ErroHandle{
    constructor(mensagem, status = 400){
        this.mensagem = mensagem
        this.status = status
    }
}

module.exports = ErroHandle