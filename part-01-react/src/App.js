import {useState} from 'react';
import Button from './components/Button'
import Statistics from './components/Statistics';

export default function App() {
  const [feedbackGood, setFeedbackGood] = useState(0);
  const [feedbackNeutral, setFeedbackNeutral] = useState(0);
  const [feedbackBad, setFeedbackBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setFeedbackGood(feedbackGood + 1)} text="Good" />
      <Button onClick={() => setFeedbackNeutral(feedbackNeutral + 1)} text="Neutral" />
      <Button onClick={() => setFeedbackBad(feedbackBad + 1)} text="Bad" />
      <Statistics good={feedbackGood} neutral={feedbackNeutral} bad={feedbackBad}/>
    </div>
  )
}