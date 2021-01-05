import ErrorBoundary from "./ErrorBoundary"

export default function Languages(array) {
  const languagesArr = array.array;
  return(
    <ul>
      {
        languagesArr.map((ele, i) => {
          console.log('📣 LANGUAGES ~')
          return <li key={i}>{ele.name}</li>
        })
      }
    </ul>
  )
}