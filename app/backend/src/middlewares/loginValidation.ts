import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/CustomError';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    if (error.details[0].type === 'any.required') {
      throw new CustomError(400, error.details[0].message);
    }
    if (error.details[0].type === 'string.min') {
      throw new CustomError(422, error.details[0].message);
    }
    if (error.details[0].type === 'string.empty') {
      throw new CustomError(400, 'All fields must be filled');
    }
  }

  next();
};

export default loginValidation;
