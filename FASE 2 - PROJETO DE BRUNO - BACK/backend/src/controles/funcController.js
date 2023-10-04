const ErroHandle = require("../middlewares/ErroHandle")
const FuncionarioModel = require("./modulos/funcModel")

async function pegarFuncionario(req, res){
    const email = req.email

    if(!email){
        throw new ErroHandle("CPF inválido")
    }
    const funcionarioExiste = await FuncionarioModel.findOne({email})

    if (!funcionarioExiste){
        throw new ErroHandle("Funcionario não emcontrado", 401)
    }

    return res.status(200).json(funcionarioExiste)

}

async function criarFuncionario(req, res){
    const nome = req.body.nome
    const cpf = req.body.cpf
    const senha = req.body.senha
    const idade = req.body.idade
    const email = req.body.email

    if(!nome){
        throw new ErroHandle("Nome inválido")
    }
    if(!cpf){
        throw new ErroHandle("CPF inválido")
    }
    if(!idade){
        throw new ErroHandle("Idade inválida")
    }
    if(!senha){
        throw new ErroHandle("Senha Inválida")
    }
    if(!email){
        throw new ErroHandle("Email inválido")
    }

    const funcionarioCpf = await FuncionarioModel.findOne({cpf})
    const funcionarioEmail = await FuncionarioModel.findOne({email})
    
    if(funcionarioCpf){
        throw new ErroHandle("Funcionario ja existente",409)
    }
    
    if(funcionarioEmail){
        throw new ErroHandle("Funcionario ja existente",409)
    }
    
    const func = await FuncionarioModel.create({nome, cpf, senha, idade, email})

    return res.status(201).json(func)

}

async function deletarFuncionario(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new ErroHandle("CPF inválido")
    }
    const funcionarioExiste = await FuncionarioModel.findOne({cpf})

    if (!funcionarioExiste){
        throw new ErroHandle("Funcionario não emcontrado", 404)
       
    }
  
    await FuncionarioModel.deleteOne({cpf})
    
    return res.status(200).json({mensagem:"Funcionario deletado!"})

}

async function atualizarFuncionario(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new ErroHandle("CPF inválido")
    }
    const funcionarioExiste = await FuncionarioModel.findOne({cpf})
    if (!funcionarioExiste){
        throw new ErroHandle("Funcionario não emcontrado", 401)
       
    }
    const nome = req.body.nome
    const novoCpf = req.body.cpf
    const senha = req.body.senha
    const idade = req.body.idade
    const email = req.body.email

    const cpfExiste = await FuncionarioModel.findOne({cpf:novoCpf})

    if (cpfExiste){
        throw new ErroHandle("CPF existente")
    }
     
    await FuncionarioModel.updateOne({cpf},{nome, cpf:novoCpf, senha, idade})

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!!"})

}

module.exports = {
    criarFuncionario, pegarFuncionario, atualizarFuncionario, deletarFuncionario
}