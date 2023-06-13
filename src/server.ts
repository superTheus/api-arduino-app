import express from 'express';
import { router } from './routes';

const app = express();

app.listen(3333);
app.use(function (req, res, next) {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  });
  next();
});
app.use(express.json());
app.use(router);