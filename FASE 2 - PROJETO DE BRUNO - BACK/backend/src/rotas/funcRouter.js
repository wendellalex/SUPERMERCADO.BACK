const{ Router } = require("express")
const { criarFuncionario, pegarFuncionario, atualizarFuncionario, deletarFuncionario } = require("../controles/funcController")
const {autenticacao} = require("../middlewares/autenticacao")

const funcRouter = Router()

funcRouter.post("/funcionarios",criarFuncionario)
funcRouter.get("/funcionarios", autenticacao, pegarFuncionario)
funcRouter.put("/funcionarios/:cpf", autenticacao, atualizarFuncionario)
funcRouter.delete("/funcionarios/:cpf", autenticacao, deletarFuncionario)

module.exports = funcRouter