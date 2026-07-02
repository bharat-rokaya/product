import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/config.js';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import productRoutes from './routes/product.route.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');

await connectDB();

app.use(cors());

app.use(bodyParser.json());

app.use('/uploads', express.static(uploadsDir));

app.get('/', (req, res) => {
  res.send('Hello from express!');
});

app.use('/api/product', productRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});