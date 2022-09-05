
interface BmiArgs {
  heightCm: number,
  weightKg: number,
}

const calculateBmi = (heightCm: number, weightKg: number): string => {
  // formula for BMI kg/m^2
  const heightM: number = (heightCm/100)
  const Bmi = weightKg/heightM**2;
  let message: String;

  if (Bmi <= 18.5) {
    message = 'underweight';
  } else if (Bmi > 18.5 && Bmi <= 24.9) {
    message = 'normal, healthy weight';
  } else if (Bmi > 24.9 && Bmi <= 29.9) {
    message = 'overweight';
  } else {
    message = 'obese';
  }

  return `BMI of ${Bmi} is considered ${message}.`;
}

const parseBmiArguments = (args: Array<string>): BmiArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Found non-numeric value in provided args")
  }
  
  return { heightCm: Number(args[2]), weightKg: Number(args[3]) }
}


try {
  const { heightCm, weightKg } = parseBmiArguments(process.argv)
  console.log(calculateBmi(heightCm, weightKg))

} catch (error: unknown) {
  const errorMessage = error instanceof Error
    ? `Error: ${error.message}`
    : `Something bad happened`

  console.log(errorMessage)
}
