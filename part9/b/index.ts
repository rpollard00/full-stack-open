import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
//import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  try {
    const bmi = calculateBmi(height, weight);
    res.status(200).send({
      height,
      weight,
      bmi
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ?
      error.message :
      'bad request';

      res.status(400).send({ error: errorMessage }); 
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body as { target: string, daily_exercises: Array<number> };

  if ( !daily_exercises || ! target ) {
    return res.status(400).send({ error: "parameters missing "});
  }

  // sum daily_exercises, if one of the values is not a number then the sum will be returned as NaN
  // meaning it contains an invalid value
  const validExercise = daily_exercises.reduce((a, b) => b + a, 0);

  if (isNaN(validExercise) || isNaN(Number(target))) {
    return res.status(400).send({ error: `malformatted parameters` });
  }
  
  try {
    const result = calculateExercises(daily_exercises , Number(target));
    return res.status(200).send(result);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
    ? error.message 
    : 'bad request';

    return res.status(400).send({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});