"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const PORT = 5521;
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(routes_1.default);
app.get('/test', (req, res) => {
    res.send('hi');
});
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
