const ErroHandle = require("../middlewares/ErroHandle")
const prodModel = require("./modulos/prodModel")

async function cadastrarProduto(req, res) {
    const { nome, tipoProduto, codigo, validade, preco } = req.body
    const precoPromocao = 0

    if (!nome) {
        throw new ErroHandle("Nome inválido", 422)
    }
    if (!codigo) {
        throw new ErroHandle("Código inválido", 422)
    }
    if (!validade) {
        throw new ErroHandle("Validade inválida", 422)
    }
    if (!tipoProduto) {
        throw new ErroHandle("Tipo inválido", 422)
    }
    if (!preco) {
        throw new ErroHandle("Preço inválido", 422)
    }
    

    const produtoExiste = await prodModel.findOne({ codigo })

    if (produtoExiste) {
        throw new ErroHandle("Produto já existente", 409)
    }

    const produto = await prodModel.create({ nome, codigo, validade, tipoProduto, preco, precoPromocao })

    return res.status(201).json(produto)
}

async function pegarProduto(req, res) {
    const { codigo } = req.params
    
    if (!codigo) {
        throw new ErroHandle("Código inválido")
    }

    const produtoExiste = await prodModel.findOne({ codigo })

    if (!produtoExiste) {
        throw new ErroHandle("Produto não encontrado")
    }

    return res.status(200).json(produtoExiste)
}

async function listarProdutos(req, res) {
    const produtos = await prodModel.find()

    return res.status(200).json(produtos)
}

async function atualizarProduto(req, res) {
    const { codigo } = req.params
    const { precoPromocao } = req.body

    if (!codigo) {
        throw new ErroHandle("Código inválido")
    }

    const produtoExiste = await prodModel.findOne({ codigo })

    if (!produtoExiste) {
        throw new ErroHandle("Produto não encontrado")
    }

    await prodModel.updateOne({ codigo }, { precoPromocao })

    const updatedProduto = await prodModel.findOne({ codigo })

    return res.status(200).json(updatedProduto);
}

async function deletarProduto(req, res) {
    const { codigo } = req.params

    if (!codigo) {
        throw new ErroHandle("Código inválido")
    }

    const produtoExiste = await prodModel.findOne({ codigo })

    if (!produtoExiste) {
        throw new ErroHandle("Produto não encontrado")
    }

    await prodModel.deleteOne({ codigo })

    return res.status(200).json({ mensagem: "Produto deletado!" })
}

module.exports = {
    cadastrarProduto,
    pegarProduto,
    atualizarProduto,
    deletarProduto,
    listarProdutos
}