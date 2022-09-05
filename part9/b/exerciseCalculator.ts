
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

interface Args {
  dailyTarget: number,
  dailyExercise: Array<number> 
}

const rateExercise = (average: number, target: number): Rating => {
  if (average < target/2) {
    return {
      rating: 1,
      ratingDescription: 'not very good',
    }
  } else if (average < target) {
    return { 
      rating: 2,
      ratingDescription: 'you could do better',
    }
  } else {
    return {
      rating: 3,
      ratingDescription: 'keep up the great work',
    }
  }
}

const calculateExercises = 
  (dailyExercise: Array<number>, dailyTarget: number): 
  ExerciseResult => {
  
  const dailyAverage = dailyExercise.reduce((a, b) => a + b, 0) / dailyExercise.length
  const { rating, ratingDescription } = rateExercise(dailyAverage, dailyTarget)

  return {
    periodLength: dailyExercise.length,
    trainingDays: dailyExercise.filter(d => d !== 0).length,
    success: dailyAverage >= dailyTarget,
    rating,
    ratingDescription,
    target: dailyTarget,
    average: dailyAverage
  }
}

const parseArguments = (args: Array<string>): Args => {
  const dailyTarget: number = Number(args[2])

  if (isNaN(dailyTarget)) throw new Error(`dailyTarget is not a number`)
  // get args 3 and later, cast them to numbers, make sure they are valid numbers
  const dailyExercise: Array<number> = args.slice(3).map((exercise: string) => {
    if (isNaN(Number(exercise))) {
      throw new Error(`Provided values are not all numbers. ${exercise}`)
    }
    return Number(exercise)
   })

  return {
    dailyTarget,
    dailyExercise,
  }
}


try {
  const { dailyTarget, dailyExercise } = parseArguments(process.argv);
  const result: ExerciseResult = calculateExercises(dailyExercise, dailyTarget)
  console.log(result)
} catch (error: unknown) {
  let errorMessage = 'Error occurred'

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}