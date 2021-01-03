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
    <table>
      <tbody>
        <tr>
          <td>Good:</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral:</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad:</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>TOTAL FEEDBACK COUNT:</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>Average Feedback:</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>% Positive:</td>
          <td>{positivePercent}</td>
        </tr>
      </tbody>
    </table>
  )
}