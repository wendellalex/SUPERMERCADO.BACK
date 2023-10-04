const ErroHandle = require("../middlewares/ErroHandle")
const clienteModel = require("./modulos/clienteModel")
const funcionariosModel = require("./modulos/funcModel")

const{ sign } = require("jsonwebtoken")

async function autenticacaoClient(req, res){
    const email = req.body.email
    const cpf = req.body.cpf

    if(!email){
        throw new ErroHandle("CPF não enviado")
    }
    if(!cpf){
        throw new ErroHandle("Nome não enviada")
    }

    const clienteExiste = await clienteModel.findOne({email})

    if(!clienteExiste){
        throw new ErroHandle("Cliente não encontrado")
    }

    if(!(clienteExiste.cpf === cpf)){
        throw new ErroHandle("cliente não encontrado")
        
    } 

    const segredo = "wendell123456789"

    const token = sign({email,cpf}, segredo,{expiresIn: '7d'})
    return res.status(200).json(token)
}

async function autenticacaoFuncionario(req, res){
    const email  = req.body.email
    const senha = req.body.senha

    if(!email){
        throw new ErroHandle("CPF não enviado!!!")
    }
    if(!senha){
        throw new ErroHandle("Senha não enviada")
    }

    const funcionarioExiste = await funcionariosModel.findOne({email})
    

    if(!funcionarioExiste){
        throw new ErroHandle("Funcionario não encontrado", 401)
    }
    if(funcionarioExiste.senha !== senha){
        throw new ErroHandle("Funcionario não encontrado", 401)
 
    } 
    const segredo = "wendell123456789"

    const token = sign({email, senha}, segredo, { expiresIn: '7d'})

    return res.json({token})
}

module.exports = {
    autenticacaoFuncionario, autenticacaoClient
}

