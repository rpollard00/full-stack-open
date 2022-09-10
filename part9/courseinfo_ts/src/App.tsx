import './App.css';


interface HeaderProps {
  name: string,
}

const Header = ({ name }: HeaderProps) => {
  return (
    <h1>{name}</h1>
  )
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescription {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


interface ContentProps {
  content: Array<CoursePart>,
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  part: CoursePart,
}

const Part = ({ part }: PartProps) => {
  switch (part.type) {
    case "normal":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br/>
          <em>{part.description}</em>
        </p>
      )
    case "groupProject":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br /> 
          project exercises {part.groupProjectCount}
        </p>
      )
    case "submission":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br /> 
          submit to {part.exerciseSubmissionLink}
        </p>
      )
      case "special":
        return (
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br />
            <em>{part.description}</em><br /> 
            required skills: {part.requirements.map(r => r).join(', ')}
          </p>
        )
    default:
      return assertNever(part);
  }
};

const Content = ({ content }: ContentProps) => {
  return (
    <>
      {content.map((c: CoursePart) => {
        return <Part key={c.name} part={c} />
      })}
    </>
  )
}

const Total = ({ content }: ContentProps) => {

  return (
    <p>
      Number of exercises{" "}
      {content.reduce((a: number, i: CoursePart) => a + i.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is hte hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total content={courseParts} />
    </div>
  );
};

export default App;
