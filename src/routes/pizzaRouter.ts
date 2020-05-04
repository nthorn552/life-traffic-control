import { Router, Request, Response } from 'express';
import pizzaController from '../controllers/pizzaController';

const pizzaRouter = Router();

pizzaRouter.get('/', (request: Request, response: Response) => {
    // console.log('pizza');
    pizzaController.getAll().then((pizza: any) => {
        response.status(200).send(pizza);
    })
});

// pizzaRouter.delete('/', (request: Request, response: Response) => {
//     response.send(pizzaController.test());
// })

export default pizzaRouter