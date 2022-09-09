import { v4 as uuid } from 'uuid';
import patientsData from "../../data/patientsData";

import { NewPatient, NonSensitivePatient, Patient } from "../types";


const getEntries = (): Array<Patient> => {
  return patientsData;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
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
};