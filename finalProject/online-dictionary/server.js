import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routers/DictionaryRouter.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';

dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});