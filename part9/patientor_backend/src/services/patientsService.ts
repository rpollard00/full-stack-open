import { v4 as uuid } from 'uuid';
import patientsData from '../../data/patientsData';

import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  OccupationalHealthcareEntry,
  Patient,
} from '../types';

const getEntries = (): Array<Patient> => {
  return patientsData;
};

const getById = (id: string): Patient | undefined => {
  return patientsData.find((p) => p.id === id);
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newPatient = {
    id,
    ...patient,
  };

  patientsData.push(newPatient);
  return newPatient;
};

const parseHealthCheckRating = (rating: string): HealthCheckRating => {
  const ratingNumber = Number(rating);

  if (ratingNumber < 0 || ratingNumber > 4) {
    throw new Error('Invalid Health Check Rating');
  }

  return ratingNumber as HealthCheckRating;
};

type HealthCheckEntryFields = {
  description: unknown;
  date: unknown;
  type: unknown;
  specialist: unknown;
  healthCheckRating: unknown;
  diagnosisCodes: unknown[];
};

const toNewHealthCheckEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
}: HealthCheckEntryFields) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newHealthCheckEntry: HealthCheckEntry = {
    id,
    description: description as string,
    date: date as string,
    type: 'HealthCheck',
    specialist: specialist as string,
    diagnosisCodes: diagnosisCodes as Array<Diagnosis['code']>,
    healthCheckRating: parseHealthCheckRating(healthCheckRating as string),
  };

  return newHealthCheckEntry;
};

type HospitalEntryFields = {
  description: unknown;
  date: unknown;
  type: unknown;
  specialist: unknown;
  discharge: {
    date: unknown;
    criteria: unknown;
  };
  dischargeDate: unknown;
  dischargeCriteria: unknown;
  diagnosisCodes: unknown[];
};

const toNewHospitalEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
}: HospitalEntryFields): HospitalEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newHospitalEntry: HospitalEntry = {
    id,
    description: description as string,
    date: date as string,
    type: 'Hospital',
    specialist: specialist as string,
    diagnosisCodes: diagnosisCodes as Array<Diagnosis['code']>,
    discharge: {
      date: discharge.date as string,
      criteria: discharge.criteria as string,
    },
  };

  return newHospitalEntry;
};

type OccupationalHealthcareEntryFields = {
  description: unknown;
  date: unknown;
  type: unknown;
  specialist: unknown;
  employerName: unknown;
  sickLeave: {
    startDate: unknown;
    endDate: unknown;
  };
  sickLeaveStart?: unknown;
  sickLeaveEnd?: unknown;
  diagnosisCodes: unknown[];
};

const toNewOccupationalHealthcareEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  employerName,
  sickLeave,
}: OccupationalHealthcareEntryFields): OccupationalHealthcareEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newOccupationalHealthcareEntry: OccupationalHealthcareEntry = {
    id,
    description: description as string,
    date: date as string,
    type: 'OccupationalHealthcare',
    specialist: specialist as string,
    diagnosisCodes: diagnosisCodes as Array<Diagnosis['code']>,
    employerName: employerName as string,
  };

  if (sickLeave.startDate && sickLeave.endDate) {
    return {
      ...newOccupationalHealthcareEntry,
      sickLeave: {
        startDate: sickLeave.startDate as string,
        endDate: sickLeave.endDate as string,
      },
    };
  }

  return newOccupationalHealthcareEntry;
};

const addEntry = (id: string, entry: NewEntry): Patient | null => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  let entryToAdd: Entry;

  switch (entry.type) {
    case 'HealthCheck':
      entryToAdd = toNewHealthCheckEntry(entry as HealthCheckEntryFields);
      break;
    case 'Hospital':
      entryToAdd = toNewHospitalEntry(entry as HospitalEntryFields);
      break;
    case 'OccupationalHealthcare':
      entryToAdd = toNewOccupationalHealthcareEntry(
        entry as OccupationalHealthcareEntryFields
      );
      break;
    default:
      throw new Error('Invalid data in post');
  }

  // get patient by id
  const patient = getById(id);

  if (!patient) return null;
  // modify patient object
  const modifiedPatient = {
    ...patient,
    entries: [...patient.entries, entryToAdd],
  };

  // update patient data list
  const newPatientsData = patientsData.map((p) =>
    p.id !== id ? p : modifiedPatient
  );
  patientsData.splice(0, patientsData.length, ...newPatientsData);

  return modifiedPatient;
};

export default {
  addPatient,
  addEntry,
  getEntries,
  getNonSensitiveEntries,
  getById,
};
