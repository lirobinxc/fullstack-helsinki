import React from 'react'

const ErrorMessage = ({ msg }) => {
  return (
    <div>
      <h2 style={{color:"red"}}>ERROR: {msg}</h2>
    </div>
  )
}

export default ErrorMessage