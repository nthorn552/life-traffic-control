import { Router } from 'express';
import pizzaRouter from './pizzaRouter';

const baseRouter = Router();

baseRouter.use('/pizza', pizzaRouter);

export default baseRouter