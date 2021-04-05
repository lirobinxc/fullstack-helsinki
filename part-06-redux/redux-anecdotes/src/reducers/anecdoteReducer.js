const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const generateId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      const index = state.findIndex((ele) => ele.id === action.payload.id);
      if (index === -1) return state;
      const newState = state.map((ele, i) => {
        return i === index ? { ...ele, votes: ++ele.votes } : ele;
      });
      const sortedState = newState.sort((a, b) => b.votes - a.votes);
      return sortedState;
    case 'ADD_NEW':
      return [...state, asObject(action.payload.content)];
    default:
      return state;
  }
};

export const voteAction = (id) => {
  console.log('vote', id);
  return {
    type: 'VOTE',
    payload: { id: id },
  };
};

export const addNoteAction = (e) => {
  e.preventDefault();
  let content = e.target.newNote.value;
  console.log('newNote:', content);
  const action = {
    type: 'ADD_NEW',
    payload: {
      content,
    },
  };
  return action;
};

export default anecdoteReducer;
