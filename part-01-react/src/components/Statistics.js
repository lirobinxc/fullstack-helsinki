import {useState, useEffect} from 'react';

export default function Statistics({good, neutral, bad}) {
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positivePercent, setPositivePercent] = useState(0);

  useEffect(() => {
    let total = bad + good + neutral
    
    let calculateAverage = () => {
      return (good * 1 + neutral * 0 + bad * -1) / total
    }
    
    setTotal(total)
    if (total === 0) {
      setAverage(0)
    } else {
      setAverage(calculateAverage);
      setPositivePercent(good/total);
    }

  }, [bad, good, neutral])

  return (
    <div>
      <h1>Statistics</h1> 
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>TOTAL FEEDBACK COUNT: {total}</p>
      <p>Average Feedback: {average}</p>
      <p>Percent Positive: {positivePercent} %</p>
    </div>
  )
}