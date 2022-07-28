const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  console.log(course);
  return (
    <div>
      {
        course.parts.map((part) => <Part key={part.id} part={part} />)
      }
    </div>
  )
}
  
const Total = ({course}) => {
  const exercises = course.parts.map((part) => part.exercises )
  const totalExercises = exercises.reduce((total, x) => total += x, 0)

  return (
      <>
      <p className='total'>total of {totalExercises} exercises</p>
      </>
  )
}
  
const Course = ({ course }) => {

  return (
      <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course}/>
  </div>
  )
}

  export default Course;