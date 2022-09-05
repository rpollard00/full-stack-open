import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height)
  const weight: number = Number(req.query.weight)
  try {
    const bmi = calculateBmi(height, weight)
    res.status(200).send({
      height,
      weight,
      bmi
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ?
      error.message :
      'bad request';

      res.status(400).send({ error: errorMessage }) 
  }


})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});