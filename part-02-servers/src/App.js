import { useState } from 'react';
import './App.css';

export default function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1)
  }


  document.title = `Total Clicks: ${counter}`

  return (
    <div>
      Welcome
      <button onClick={incrementCounter}>This button has been clicked {counter} times.</button>
    </div>
  )

}