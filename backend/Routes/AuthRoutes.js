const router = require('express').Router();
const { register, login } = require('../controllers/AuthController');
const { registerValidation, loginValidation } = require('../Middlewares/AuthValidation');

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register);

module.exports = router;