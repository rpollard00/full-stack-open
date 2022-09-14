export const assertNever = (val: never): never => {
  throw new Error(`Unexpected member ${JSON.stringify(val)}`);
};
