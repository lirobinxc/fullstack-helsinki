import React, { useState } from 'react'

const ResponsiveButtonAsync = ({ name, loadingText, errorMessage, onClick, id, style}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isError, setIsError] = useState(false)

  const errorMsg = () => (
    <span style={{color:"red", fontWeight:"bold"}}>{ errorMessage }</span> 
  )

  const handleClick = async () => {
    setIsProcessing(true)
    try {
      await onClick()
      setIsProcessing(false)
    } catch(err) {
      setIsError(true)
      setTimeout(() => {
        setIsProcessing(false)
        setIsError(false)
      }, 2500)
    }
  }
  
  return (
    <span>
      {
        isError === true
          ? errorMsg()
          : isProcessing === true
            ? <span style={{color:"red", fontWeight:"bold"}}>{ loadingText }</span>
            : <input style={style} type="button" name={id} value={name} onClick={handleClick}/>
      }
    </span>
  )
}

export default ResponsiveButtonAsync