"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const pizzaController_1 = tslib_1.__importDefault(require("../controllers/pizzaController"));
const pizzaRouter = express_1.Router();
pizzaRouter.get('/', (request, response) => {
    pizzaController_1.default.getAll().then((pizza) => {
        response.status(200).send(pizza);
    });
});
exports.default = pizzaRouter;
