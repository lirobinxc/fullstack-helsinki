export default function CountryList({ countriesArr }) {
  return(
    <ul>
      {countriesArr.map((ele, i) => {
          return(
            <li key={ele.alpha3Code}>{ele.name}</li> 
          )}
      )}
    </ul>
  )
}