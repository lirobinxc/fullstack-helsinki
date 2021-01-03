import {useEffect, useState} from 'react';
import Button from './components/Button'

export default function App() {
  const [selected, setSelected] = useState(0)

  const anecdotes = [
    '1) If it hurts, do it more often',
    '2) Adding manpower to a late software project makes it later!',
    '3) The first 90 percent of the code accounts for the first 90 percent of the development time.',
    '4) Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    '5) Premature optimization is the root of all evil.',
    '6) Debugging is twice as hard as writing the code in the first place.'
  ]

  // Create empty votes array of 0s
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [popular, setPopular] = useState('')

  function randomInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  const handleClick = () => {
    setSelected(randomInclusive(0, 5))
  }

  const voteUp = () => {
    const copy = [...votes]
    copy[selected] += 1;
    setVotes(copy)
  }

  useEffect(() => {
    const bestQuoteIndex = votes.indexOf(Math.max(...votes))
    const bestQuote = anecdotes[bestQuoteIndex]
    console.log(bestQuote)
    setPopular(bestQuote)
  }, [votes, anecdotes])

  return (
    <div>
      <h1>Anecdote Randomizer</h1>
      <p>{anecdotes[selected]}</p>
      <Button onClick={voteUp} text="Vote Up" />
      {/* <Button onClick={voteDown} text="Vote Down" /> */}
      <Button onClick={handleClick} text="Random Quote" />
      <h1>Current Most Popular</h1>
      <p>{popular}</p>
      
    </div>
  )
}