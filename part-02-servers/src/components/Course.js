import Header from './Header'
import Total from './Total'
import Content from './Content'

export default function Course({ course }) {
  return (
    course.map((ele, i) => {
      return (
        <div>
          <Header course={ele} />
          <Content course={ele} />
          <Total course={ele} />
        </div>
      )
    })
  )
}