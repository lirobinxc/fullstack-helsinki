const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, val) => {
    console.log('📣 acc ~', acc)
    console.log('📣 val ~', val.exercises)
    return acc + val.exercises
  }, 0)
  return(
    <p><strong>Number of exercises {sum}</strong></p>
  ) 
}

export default Total;