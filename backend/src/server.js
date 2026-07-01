import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import productRoutes from './routes/product.route.js';

const app = express();

connectDB();

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from express!');
});

app.use('/api/product', productRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});