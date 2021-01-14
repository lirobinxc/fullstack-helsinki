export default function ErrorMessage({ msg, isError }) {
  const successStyle = {
    border: "2px solid green",
    backgroundColor: "lightGreen",
    display: "flex",
    justifyContent: "center",
    width: "50vw",
    margin: "0.5em",
    padding: "0.5em",
    fontSize: "1.2em",
    fontStyle: "bold",
    color: "darkGreen"
  }
  const errorStyle = {
    border: "2px solid red",
    backgroundColor: "pink",
    display: "flex",
    justifyContent: "center",
    margin: "0.5em",
    padding: "0.5em",
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "darkRed"
  }
  let currentStyle = isError ? errorStyle : successStyle;
  
  return(
    <div className="error" style={currentStyle}>
      {msg}
    </div>
  )
}