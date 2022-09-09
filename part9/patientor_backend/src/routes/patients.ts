import express from 'express';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(patientsService.getNonSensitiveEntries());
});

export default router;