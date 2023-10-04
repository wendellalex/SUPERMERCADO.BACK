const{Router} = require("express")
const { autenticacaoFuncionario, autenticacaoClient } = require("../controles/autenticacaoControllers")


const autenticacaoRouter = Router()

autenticacaoRouter.post("/autenticacao/funcionario", autenticacaoFuncionario)
autenticacaoRouter.post("/autenticacao/cliente",autenticacaoClient)

module.exports = autenticacaoRouter