import express from 'express';
const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('The /ping endpoint works');
  res.status(201).send({ data: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});