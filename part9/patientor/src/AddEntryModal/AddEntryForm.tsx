import { Button, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Field, FieldProps, Form, Formik } from "formik";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { SetStateAction } from "react";

//import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { TextField } from "../AddPatientModal/FormField";
import { RawEntry } from "../types";

/*
 * use type NewEntry, but omit id,
 * because those are irrelevant for new patient object.
 */
//export type EntryFormValues = Omit<Entry, "id">;
export type EntryFormValues = Omit<RawEntry, "id">;

export type EntryTypeOption = {
  value: string;
  label: string;
};

type SelectEntryFieldProps = {
  name: string;
  label: string;
  options: EntryTypeOption[];
  //entryType: string;
  //setType: React.Dispatch<SetStateAction<string>>;
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

// export const SelectEntryField = ({ name, label, options, entryType, setType }: SelectEntryFieldProps) => {
//   console.log("Entry Type", entryType);

//   const handleType = (event: any): void => {
//     setType(event.target.value as string);
//   };

//   return (
//   <>
//     <InputLabel>{label}</InputLabel>
//     <Field
//       fullWidth
//       style={{ marginBottom: "0.5em" }}
//       label={label}
//       component={FormikSelect}
//       name={name}
//       value={entryType}
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       onChange={(event: any) => {handleType(event);}}

//     >
//       {options.map((option) => (
//         <MenuItem key={option.value} value={option.value}>
//           {option.label}
//         </MenuItem>
//       ))}
//     </Field>
//   </>
// );};

export const SelectEntryField = ({ name, label, options }: SelectEntryFieldProps) => {
    return (
    <>
      <InputLabel>{label}</InputLabel>
      <Field
        fullWidth
        style={{ marginBottom: "0.5em" }}
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
  );};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: "HealthCheck", label: "HealthCheck"},
  { value: "Hospital", label: "Hospital"},
  { value: "OccupationalHealthcare", label: "Occupational"},
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const initialValues: EntryFormValues = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    type: 'HealthCheck',
    healthCheckRating: 2,
    employerName: "",
    sickLeave: { startDate: "", endDate: "" },
    discharge: { date: "", criteria: ""},
    //sickLeaveStart: "",
    //sickLeaveEnd: "",
    //dischargeDate: "",
    //dischargeCriteria: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // validate={(values) => {
      //   const requiredError = "Field is required";
      //   const errors: { [field: string]: string } = {};
      //   if (!values.name) {
      //     errors.name = requiredError;df
      //   }
      //   if (!values.ssn) {
      //     errors.ssn = requiredError;
      //   }
      //   if (!values.dateOfBirth) {
      //     errors.dateOfBirth = requiredError;
      //   }
      //   if (!values.occupation) {
      //     errors.occupation = requiredError;
      //   }
      //   return errors;
      // }}
    >
      {({ isValid, dirty, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Enter a description.."
              name="description"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Dr. House"
              name="specialist"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              component={TextField}
            />
            {/* <SelectEntryField label="Entry Type" name="type" options={entryTypeOptions} entryType={entryType} setType={setEntryType}/> */}
            <SelectEntryField label="Entry Type" name="type" options={entryTypeOptions} />
            {
              values.type === "HealthCheck" && (
                <Field
                label="HealthCheckRating"
                placeholder="0 - 4"
                name="healthCheckRating"
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                component={TextField}
              /> 
            )}
            {
              values.type === "Hospital" && (
                <>           
                  <Field
                    label="Discharge Date"
                    placeholder="YYYY-MM-DD"
                    name="discharge.date"
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    component={TextField}
                  />
                  <Field
                    label="Discharge Criteria"
                    placeholder="Not bleeding..."
                    name="discharge.criteria"
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    component={TextField}
                  />
                </>
            )}
            {
              values.type === "OccupationalHealthcare" && (
                <>           
                  <Field
                    label="Employer Name"
                    placeholder="Mikerowesoft"
                    name="employerName"
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    component={TextField}
                  />
                  <Field
                    label="Sick Leave Start"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.startDate"
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    component={TextField}
                  />
                  <Field
                    label="Sick Leave End"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    component={TextField}
                  />
                </>
            )}
            {/* <TypeFields type={entryType} /> */}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
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
