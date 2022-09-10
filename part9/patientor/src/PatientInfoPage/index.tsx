/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setCurrentPatient, useStateValue } from "../state";
import { Diagnosis, Entry, Patient } from "../types";

// interface PatientProps {
//   id: string,
// }

interface DiagnosisProps {
  diagnoses: Diagnosis[];
}

const Diagnosis = ({ diagnoses }: DiagnosisProps) => {
  return (<></>);
};

interface EntriesProps {
  entries: Entry[],
}

const Entries = ({ entries } : EntriesProps) => {
  return (
    <div>
      <h2>entries</h2>
      {
        entries.map(e => {
          return (
            <div key={e.id}>
              <p>{e.date} - {e.description}</p>
              { e.diagnosisCodes 
                ?
                <ul>
                  {e.diagnosisCodes.map(c => {
                    return (<li key={c}>{c}</li>);
                    })
                  }
                </ul>
                : null
              }
            </div>
          );}
        )
      }
    </div>
  );
};

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

      <Entries entries={currentPatient.entries} />
    </div>
  );
};

export default PatientInfoPage;