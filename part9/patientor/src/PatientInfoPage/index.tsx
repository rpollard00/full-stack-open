/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setCurrentPatient, useStateValue } from "../state";
import { Patient } from "../types";

// interface PatientProps {
//   id: string,
// }

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ currentPatient }, dispatch] = useStateValue();
  
  if (!id) return null; //guard against id not yet being assigned

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setCurrentPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
      
    };
    console.log("id", id);
    void fetchPatient();
  }, [id]);
  
  if (!currentPatient) return null;

  return (
    <div>
      <h2>{currentPatient.name}</h2>
      gender: {currentPatient.gender}<br />
      ssn: {currentPatient.ssn || "None"}<br />
      occupation: {currentPatient.occupation}<br />
    </div>
  );
};

export default PatientInfoPage;