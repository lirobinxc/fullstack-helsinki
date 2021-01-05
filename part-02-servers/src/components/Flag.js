export default function Flag({ countryObj }) {
  return(
    <div>
      <img src={countryObj.flag} alt={countryObj.name} style={{height:"50px"}}/>
      {console.log("DISPLAYING FLAG...")}
    </div>
  )
}