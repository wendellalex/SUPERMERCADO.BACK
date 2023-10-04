const{verify} = require("jsonwebtoken")
function autenticacao (req, res, next){
    try {
        const auth = req.headers.authorization
        if(!auth){
            
            return res.status(401).end()
        }

        const[,token] = auth.split(" ")
        const segredo = "wendell123456789"
        
        const {email} = verify(token, segredo)
    
        req.email = email
        return next()
    } catch (error) {
        return res.status(401).end()
    }
}

module.exports = {
    autenticacao
}