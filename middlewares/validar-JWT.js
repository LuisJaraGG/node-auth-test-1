const { response, request } = require("express")
const jwt = require('jsonwebtoken')
const usuario = require("../models/usuario")

const validarJWT = async (req = request, res = response, next) => {
    
    try {
        const token = req.header('x-token')
        if (!token) {
            return res.json({
                message: "No hay web token"
            })
        }
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const id = payload.uid
        const usserverificated = await usuario.findOne({ _id: id })

        if (!usserverificated) return res.status(401).json({ message: "Usuario no encontrado" })
        if (!usserverificated.estado) return res.status(401).json({ message: "Usuario no valido-estado false" })
        req.userverified = usserverificated
        next()
    } catch (error) {

        return res.status(401).json({ message: error.message })
    }

}

module.exports = { validarJWT }