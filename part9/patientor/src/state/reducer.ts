import { Patient } from "../types";
import { State } from "./state";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_CURRENT_PATIENT"
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_CURRENT_PATIENT":
        return {
          ...state,
          currentPatient: action.payload
        };
    default:
      return state;
  }
};


/**
 * Action creator for setting the patientList
 * @param patientList 
 * @returns 
 */
export const setPatientList = (patientList: Patient[]) => {
  const action: Action = {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };

  return action;
};


/**
 * Action creator for adding a new patient
 * @param patient 
 * @returns 
 */
export const addPatient = (patient: Patient) => {
  const action: Action = {
    type: "ADD_PATIENT",
    payload: patient
  };

  return action;
};

/**
 * Action creator for setting the currently selected patient
 * @param patient 
 * @returns void 
 */
export const setCurrentPatient = (patient: Patient) => {
  const action: Action = {
    type: "SET_CURRENT_PATIENT",
    payload: patient
  };

  return action;
};