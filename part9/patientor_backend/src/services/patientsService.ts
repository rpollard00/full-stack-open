import { v4 as uuid } from 'uuid';
import patientsData from "../../data/patientsData";

import { NewPatient, NonSensitivePatient, Patient } from "../types";


const getEntries = (): Array<Patient> => {
  return patientsData;
};

const getById = (id: string): Patient | undefined => {
  return patientsData.find(p => p.id === id);
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  })); 
};

const addPatient = ( patient:  NewPatient ): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newPatient = {
    id,
    ...patient,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  addPatient,
  getEntries,
  getNonSensitiveEntries,
  getById,
};