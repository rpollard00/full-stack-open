
export const assertNever = (val: never): never => {
  throw new Error(`Unexpected member ${JSON.stringify(val)}`);
};



// export const parseEntry = (entry: EntryFormValues): Entry => {
//   switch (entry.type) {
//     case "HealthCheck":
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
//       const healthCheckEntry: HealthCheckEntry = [entry].map(({discharge, employerName, sickLeave, ... entry}) => {return entry;});
//       return (healthCheckEntry as Entry);
//     case "Hospital":
//       return {
//         ...entry,
//       };
//     case "OccupationalHealthcare":
//       return {
//         ...entry,
//       };
//     default:
//       return assertNever(entry);

//   }
// };