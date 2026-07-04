import express from 'express';
import { demoLogin } from '../controllers/userController.js';

const authRouter = express.Router();

authRouter.post('/demo-login', demoLogin)

export default authRouter
