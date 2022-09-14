import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(diagnosesService.getEntries());
});

export default router;
