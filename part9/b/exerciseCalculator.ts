
interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number,
  ratingDescription: string,
}

const rateExercise = (average: number, target: number): Rating => {
  if (average < target/2) {
    return {
      rating: 1,
      ratingDescription: 'not very good',
    };
  } else if (average < target) {
    return { 
      rating: 2,
      ratingDescription: 'you could do better',
    };
  } else {
    return {
      rating: 3,
      ratingDescription: 'keep up the great work',
    };
  }
};

export const calculateExercises = 
  (dailyExercise: Array<number>, dailyTarget: number): 
  ExerciseResult => {
  
  const dailyAverage = dailyExercise.reduce((a, b) => a + b, 0) / dailyExercise.length;
  const { rating, ratingDescription } = rateExercise(dailyAverage, dailyTarget);

  return {
    periodLength: dailyExercise.length,
    trainingDays: dailyExercise.filter(d => d !== 0).length,
    success: dailyAverage >= dailyTarget,
    rating,
    ratingDescription,
    target: dailyTarget,
    average: dailyAverage
  };
};
