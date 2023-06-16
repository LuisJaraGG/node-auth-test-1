const { request, response } = require("express");



const validarAdministrador = (req=request,res=response,next)=>{
    try {
        if (!req.userverified) return res.status(500).json({ message: 'Primero verificar-error interno' }) 
        const {rol} = req.userverified
        console.log(rol);
        if (rol!== 'ADMIN_ROLE') return res.status(400).json({ message: 'EL usuario no es administrador' }) 
        next()
    } catch (error) {
        return res.status(400).json({message: error.message})        
    }

}

const tieneRol = (...roles) =>{
    return (req=request,res=response,next)=>{
        if (!req.userverified) return res.status(500).json({ message: 'Primero verificar-error interno' }) 
        const {rol} = req.userverified
        if (!roles.includes(rol)) return res.status(401).json({ message: `${rol} no tiene los permisos necesarios` })
        next()
    }
}
module.exports = {
    validarAdministrador,tieneRol
}