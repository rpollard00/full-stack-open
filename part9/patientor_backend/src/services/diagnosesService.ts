import diagnosesData from "../../data/diagnosesData";

import { Diagnose } from "../types";

const getEntries = (): Array<Diagnose> => {
  return diagnosesData;
};

export default {
  getEntries,
};
