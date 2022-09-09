import patientsData from "../../data/patientsData";

import { NonSensitivePatient, Patient } from "../types";


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

export default {
  getEntries,
  getNonSensitiveEntries,
};