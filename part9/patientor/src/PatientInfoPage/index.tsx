/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setCurrentPatient, useStateValue } from "../state";
import { Entry, Patient } from "../types";

interface DiagnosisProps {
  code: string;
}

const DiagnosisEntry = ({ code }: DiagnosisProps) => {
  // lookup the entry from the code...
  const [{ diagnoses },] = useStateValue();

  const getDiagnosisName = (code: string): string | undefined => {
    const diagnosis = Object.values(diagnoses).find(c => c.code === code); //find the diagnosis

    if (!diagnosis) return undefined; // guard against undefined
      
    return diagnosis.name;
  };

  if (!diagnoses) return null;

  return (<p>{code} {getDiagnosisName(code)}</p>);
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
                      return (
                        <DiagnosisEntry key={c} code={c} />
                      );
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