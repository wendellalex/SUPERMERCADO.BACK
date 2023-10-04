const ErroHandle = require("../middlewares/ErroHandle")
const carModel = require("./modulos/carModel")

async function pegarCompra(req, res){
    const id = req.params.id
    if(!id){
        throw new ErroHandle("Id não enviado")
    }
    const compraExiste = await carModel.findOne({_id: id})
    if (!compraExiste){
        throw new ErroHandle("Compra não emcontrada")
       
    }
    return res.status(200).json(compraExiste)

}

async function adicionarAoCarrinho(req, res){
    const produto = req.body.produto
    const cliente = req.body.cliente

    if(!produto){
        throw new ErroHandle("Produto não foi enviado")
    }
    if(!cliente){
        throw new ErroHandle("Cliente não enviado")
    }

    const carrinho = await carModel.create({produto, cliente})

    return res.status(201).json(carrinho)

}


async function deletarCompra(req, res){
    const id = req.params.id
    if(!id){
        throw new ErroHandle("Compra não enviado")
    }
    const compraExiste = await carModel.findOne({_id: id})
    if (!compraExiste){
        throw new ErroHandle("Compra não emcontrado")
       
    }
  
    await carModel.deleteOne({_id: id})
    
    return res.status(200).json({mensagem:"Compra deletado com exito"})
}

async function atualizarCompra(req, res){
    const id = req.params.id
    if(!id){
        throw new ErroHandle("ID não enviado")
    }
    const compraExiste = await carModel.findOne({_id: id})
    if (!compraExiste){
        throw new ErroHandle("Compra não emcontrada")
       
    }
    const produto = req.body.produto
    const cliente = req.body.cliente
     
    await carModel.updateOne({_id: id},{produto, cliente})
    return res.status(200).json({mensagem: "Carrinho atualizado com exito"})

}




module.exports = {
    adicionarAoCarrinho, pegarCompra, atualizarCompra, deletarCompra
}