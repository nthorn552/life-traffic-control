"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const pizzaRouter_1 = tslib_1.__importDefault(require("./pizzaRouter"));
const baseRouter = express_1.Router();
baseRouter.use('/pizza', pizzaRouter_1.default);
exports.default = baseRouter;
