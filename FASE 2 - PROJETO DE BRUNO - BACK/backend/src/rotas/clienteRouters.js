const{Router} = require("express")
const { criarCliente, pegarCliente, atualizarCliente, deletarCliente } = require("../controles/clienteController")
const { autenticacao } = require("../middlewares/autenticacao")
const clienteRouter = Router()

clienteRouter.post("/clientes",criarCliente)
clienteRouter.get("/clientes/:cpf", autenticacao, pegarCliente)
clienteRouter.put("/clientes/:cpf", autenticacao, atualizarCliente)
clienteRouter.delete("/clientes/:cpf", autenticacao, deletarCliente)
module.exports = clienteRouter