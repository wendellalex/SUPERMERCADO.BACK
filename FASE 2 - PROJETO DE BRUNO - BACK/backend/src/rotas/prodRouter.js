const { Router } = require("express")

const { cadastrarProduto, pegarProduto, atualizarProduto, deletarProduto, listarProdutos } = require("../controles/prodController")

const {autenticacao} = require("../middlewares/autenticacao")

const prodRouter = Router()

prodRouter.get("/produtos/all", autenticacao, listarProdutos)
prodRouter.post("/produtos", autenticacao,cadastrarProduto)
prodRouter.get("/produtos/:codigo", autenticacao, pegarProduto)
prodRouter.put("/produtos/:codigo", autenticacao, atualizarProduto)
prodRouter.delete("/produtos/:codigo", autenticacao, deletarProduto)

module.exports = prodRouter