import { Button, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Field, FieldProps, Form, Formik } from 'formik';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { SetStateAction } from 'react';

//import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { RawEntry } from '../types';

/*
 * use type NewEntry, but omit id,
 * because those are irrelevant for new patient object.
 */
//export type EntryFormValues = Omit<Entry, "id">;
export type EntryFormValues = Omit<RawEntry, 'id'>;

export type EntryTypeOption = {
  value: string;
  label: string;
};

type SelectEntryFieldProps = {
  name: string;
  label: string;
  options: EntryTypeOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectEntryField = ({
  name,
  label,
  options,
}: SelectEntryFieldProps) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Field
        fullWidth
        style={{ marginBottom: '0.5em' }}
        label={label}
        component={FormikSelect}
        name={name}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Field>
    </>
  );
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: 'HealthCheck', label: 'HealthCheck' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational' },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const initialValues: EntryFormValues = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    type: 'HealthCheck',
    healthCheckRating: 2,
    employerName: '',
    sickLeave: { startDate: '', endDate: '' },
    discharge: { date: '', criteria: '' },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const invalidError = 'Value is invalid';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: any = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }

        switch (values.type) {
          case 'HealthCheck':
            console.log('Uhhh', values.healthCheckRating);
            if (values.healthCheckRating < 0 || values.healthCheckRating > 4) {
              errors.healthCheckRating = 'Must be between 0 and 4';
            }
            if (isNaN(values.healthCheckRating)) {
              errors.healthCheckRating = invalidError;
            }
            break;
          case 'Hospital':
            if (!values.discharge.date) {
              errors['discharge'] = {
                date: requiredError,
              };
            }
            if (!values.discharge.criteria) {
              errors['discharge'] = {
                criteria: requiredError,
              };
            }
            break;
          case 'OccupationalHealthcare':
            break;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Enter a description.."
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Dr. House"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectEntryField
              label="Entry Type"
              name="type"
              options={entryTypeOptions}
            />
            {values.type === 'HealthCheck' && (
              <Field
                label="HealthCheckRating"
                placeholder="0 - 4"
                name="healthCheckRating"
                component={TextField}
              />
            )}
            {values.type === 'Hospital' && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Not bleeding..."
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === 'OccupationalHealthcare' && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Mikerowesoft"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
