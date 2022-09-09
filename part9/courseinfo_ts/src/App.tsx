import './App.css';


interface HeaderProps {
  name: string,
}

const Header = ({ name }: HeaderProps) => {
  return (
    <h1>{name}</h1>
  )
}

interface courseContent {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  content: Array<courseContent>,
}

const Content = ({ content }: ContentProps) => {
  return (
    <>
      {content.map((c: courseContent) => {
        return <p key={c.name}>{c.name} {c.exerciseCount}</p>
      })}
    </>
  )
}

const Total = ({ content }: ContentProps) => {

  return (
    <p>
      Number of exercises{" "}
      {content.reduce((a: number, i: courseContent) => a + i.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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
