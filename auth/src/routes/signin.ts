import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@ticketing30/common';

import { User } from '../models/user';
import { Password } from '../services/password';


const router = express.Router();

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Email should be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Please provide a password')
],
validateRequest,
async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if(!existingUser) {
    throw new BadRequestError('Invalid Credentials');
  }

  const isPasswordValid = await Password.compare(existingUser.password, password);

  if (!isPasswordValid) {
    throw new BadRequestError('Invalid credentials');
  }

  // Generate a jwt token
  const userJWT = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY!);

  // Store jwt on session
  req.session = {
    jwt: userJWT
  }

  res.status(200).send(existingUser);

});

export { router as signinRouter };
