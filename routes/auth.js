
const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { login } = require("../controllers/auth.js")
const router = Router();

router.post('/login', [
    check('email','the email is requerided').isEmail(),
    check('password', 'the password is requerided').not().isEmpty(),
    validarCampos
],login)



module.exports = router;