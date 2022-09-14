import diagnosisData from '../../data/diagnosesData';

import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  return diagnosisData;
};

export default {
  getEntries,
};
