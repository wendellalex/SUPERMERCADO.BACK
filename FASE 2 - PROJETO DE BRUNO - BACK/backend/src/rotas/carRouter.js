const{Router} = require("express")

const { adicionarAoCarrinho, pegarCompra, atualizarCompra, deletarCompra } = require("../controles/carController")
const { autenticacao } = require("../middlewares/autenticacao")

const carRouter = Router()

carRouter.post("/carrinho", autenticacao, adicionarAoCarrinho)
carRouter.get("/carrinho/:id", autenticacao, pegarCompra)
carRouter.put("/carrinho/:id", autenticacao, atualizarCompra)
carRouter.delete("/carrinho/:id", autenticacao, deletarCompra)

module.exports = carRouter