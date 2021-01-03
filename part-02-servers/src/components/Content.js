import Part from './Part'

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((ele, i) => {
        return (
          <Part key={i} part={ele} />
        )
      })}
    </div>
  )
}

export default Content;