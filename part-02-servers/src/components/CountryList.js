export default function CountryList({ countriesArr, handleClick }) {
  return(
    <ul>
      {countriesArr.map((ele, i) => {
          return(
            <li key={ele.alpha3Code}>{ele.name} <button onClick={handleClick} value={ele.name}>Show</button></li> 
          )}
      )}
    </ul>
  )
}