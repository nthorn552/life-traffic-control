import express from 'express';
import bodyParser from 'body-parser';
import baseRouter from './routes';

const PORT = 5521;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(baseRouter);
app.get('/test', (req, res) => {
    res.send('hi');
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))