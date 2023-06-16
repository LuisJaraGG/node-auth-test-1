const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario.js")
const { generarJWT } = require('../helpers/generarJWT.js')
const login = async (req, res) => {
    const { email, password } = req.body
    try {

        //verificar si el email existe
        const userfinded = await Usuario.findOne({ correo: email })
        if (!userfinded) {
            return res.status(400).json({ message: "Email no encontrado" })
        }

        //si el usuario esta activo
        if (!userfinded.estado) {
            return res.status(400).json({ message: "El usuario no esta activo" })
        }

        //verificar la contrasena
        const validarpassword = bcryptjs.compareSync(password, userfinded.password)
        if (!validarpassword) {
            return res.status(400).json({ message: "El password no esta activo" })
        }

        //Generar el JWT
        const token = await generarJWT(userfinded.id)
        res.json({
            userfinded,
            token
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

module.exports = {
    login
}