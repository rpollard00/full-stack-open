import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
app.use(express.json());

const FE_URL = "http://localhost:3000";

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", FE_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('The /ping endpoint works');
  res.status(201).send({ data: 'pong' });
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});