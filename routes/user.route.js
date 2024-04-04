import express from 'express';
import userController from '../Controllers/user.controller.js';
import loginLimiter from '../middlewares/loginLimiter.js';

const router = express.Router();

router.post('/login', userController.login);
// router.post('/signup', userController.signup);
router.post('/signout', userController.signout);
router.get('/session', userController.getUserSession);

export default router;
