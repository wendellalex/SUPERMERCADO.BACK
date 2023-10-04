const mongoose = require("mongoose")

require("express-async-errors")

const cors = require('cors')

const tratamentoDeErros = require("./middlewares/tratamentoDeErros")
const autenticacaoRouter = require("./rotas/autenticaoRouter")
const funcRouter = require("./rotas/funcRouter")
const prodRouter = require("./rotas/prodRouter")
const clienteRouter = require("./rotas/clienteRouters")
const carRouter = require("./rotas/carRouter")

mongoose.connect("mongodb+srv://wendell:12345678910@wendell.ujqlcwg.mongodb.net/?retryWrites=true&w=majority")

const express = require("express")

const app = express()

app.use(express.json())

app.use(cors())

app.use(carRouter)
app.use(clienteRouter)
app.use(prodRouter)
app.use(funcRouter)
app.use(autenticacaoRouter)

app.use(tratamentoDeErros)

app.listen(3232,()=>{
    console.log("Iniciando servidor")
})

