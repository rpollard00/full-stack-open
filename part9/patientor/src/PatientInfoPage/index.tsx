/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { apiBaseUrl } from '../constants';
import { setCurrentPatient, useStateValue } from '../state';
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
} from '../types';
import { assertNever } from '../utils';

interface DiagnosisProps {
  code: string;
}

interface EntriesProps {
  entries: Entry[];
}

interface EntryProps {
  entry: Entry;
}

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}

interface HospitalEntryProps {
  entry: HospitalEntry;
}

interface OccupationalEntryProps {
  entry: OccupationalHealthcareEntry;
}

const DiagnosisEntry = ({ code }: DiagnosisProps) => {
  // lookup the entry from the code...
  const [{ diagnoses }] = useStateValue();

  const getDiagnosisName = (code: string): string | undefined => {
    const diagnosis = Object.values(diagnoses).find((c) => c.code === code); //find the diagnosis

    if (!diagnosis) return undefined; // guard against undefined

    return diagnosis.name;
  };

  if (!diagnoses) return null;

  return (
    <li>
      {code} {getDiagnosisName(code)}
    </li>
  );
};

const BaseEntry = ({ entry }: EntryProps) => {
  return (
    <div key={entry.id}>
      <p>
        {entry.date} - {entry.description}
      </p>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((c) => {
            return <DiagnosisEntry key={c} code={c} />;
          })}
        </ul>
      ) : null}
    </div>
  );
};

const BaseEntryFooter = ({ entry }: EntryProps) => {
  return <p>diagnosis by {entry.specialist}</p>;
};

const HealthCheckComp = ({ entry }: HealthCheckEntryProps) => {
  return (
    <div>
      <BaseEntry entry={entry as Entry} />
      Health Check Rating: {entry.healthCheckRating}
      <br />
      <BaseEntryFooter entry={entry} />
      ----------------------------------------------------
    </div>
  );
};

const HospitalComp = ({ entry }: HospitalEntryProps) => {
  return (
    <div>
      <BaseEntry entry={entry} />
      Discharge Date: {entry.discharge.date}
      <br />
      Discharge Criteria: {entry.discharge.criteria}
      <br />
      <BaseEntryFooter entry={entry} />
      ----------------------------------------------------
    </div>
  );
};

const OccupationalHealthcareComp = ({ entry }: OccupationalEntryProps) => {
  return (
    <div>
      <BaseEntry entry={entry} />
      Employer: {entry.employerName}
      <br />
      {entry.sickLeave ? (
        <span>
          Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </span>
      ) : null}
      <br />
      <BaseEntryFooter entry={entry} />
      --------------------------------------------------------------------
    </div>
  );
};

const EntryDetails = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckComp entry={entry} />;
    case 'Hospital':
      return <HospitalComp entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareComp entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const Entries = ({ entries }: EntriesProps) => {
  return (
    <div>
      <h2>entries</h2>
      {entries.map((e) => (
        <EntryDetails key={e.id} entry={e} />
      ))}
    </div>
  );
};

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ currentPatient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const parsedValues = {
        ...values,
        //diagnosisCodes: values.diagnosisCodes ? values.diagnosisCodes[0].split(',').map((v: string) => v.trim()) : [],
      };
      console.log('Values', parsedValues);

      //const entry: Entry = parseEntry(values);
      //console.log("Entry", entry);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data: patientFromApi } = await axios.post<Patient>( // the backend returns the updated patient
        `${apiBaseUrl}/patients/${id}/entries`,
        parsedValues
      );
      dispatch(setCurrentPatient(patientFromApi));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <h2>{currentPatient.name}</h2>
      gender: {currentPatient.gender}
      <br />
      ssn: {currentPatient.ssn || 'None'}
      <br />
      occupation: {currentPatient.occupation}
      <br />
      {currentPatient.entries.length > 0 ? (
        <Entries entries={currentPatient.entries} />
      ) : null}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        New Entry
      </Button>
    </div>
  );
};

export default PatientInfoPage;
