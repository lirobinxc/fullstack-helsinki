import ErrorBoundary from "./ErrorBoundary";
import Languages from "./Languages";

export default function CountryData({ countriesArr }) {
  return(
    <div>
      <h2 style={{color:"red"}}>{countriesArr[0].name}</h2>
      <table>
        <tr >
          <td style={{border:"1px solid black", padding:"3px", textAlign:"center"}}>Capital</td>
          <td>{countriesArr[0].capital}</td>
        </tr>
        <tr >
          <td style={{border:"1px solid black", padding:"3px", textAlign:"center"}}>Population</td>
          <td>{countriesArr[0].population}</td>
        </tr>
        <tr >
          <td style={{border:"1px solid black", padding:"3px", textAlign:"center"}}>Languages</td>
          <td>
            <ErrorBoundary>
              <Languages array={countriesArr[0].languages}/>
            </ErrorBoundary>
          </td>
        </tr>
      </table>
      
    </div>
  )
}