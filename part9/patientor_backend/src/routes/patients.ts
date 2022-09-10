import express from 'express';
import { toNewPatientEntry } from '../utils';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patientById = patientsService.getById(id);
  if (patientById) {
    res.status(200).send(patientById);
  } else {
    res.status(404).send({ error: `ID: ${id} not found`});
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientsService.addPatient(newPatientEntry);

    res.json(addedPatientEntry);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? `Something went wrong: ${error.message}`
      : `Something went wrong.`; 

    res.status(400).send(errorMessage);
  }
  
});

export default router;