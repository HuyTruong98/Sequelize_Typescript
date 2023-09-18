import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { rootRoute } from './routes/rootRoute';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.static('.'));

app.use('/api', rootRoute);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/swagger-ui.html', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
