import ErrorBoundary from "./ErrorBoundary"

export default function Languages(array) {
  const languagesArr = array.array;
  return(
    <div>
      {
        languagesArr.map((ele, i) => {
          console.log('📣 LANGUAGES ~')
          return <p key={i}>{ele.name}</p>
        })
      }
    </div>
  )
}