import { deleteNote, getAll, postNote } from '../services/anecdoteService';

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
    id: generateId(),
    content: anecdote,
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'RESTORE_DB':
      return action.payload.data;
    case 'INITIATE_DB':
      return action.payload.data;
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
    case 'DELETE':
      return state.filter((ele) => ele.id !== action.payload.id);
    default:
      return state;
  }
};

// ACTION GENE

export const initiateDbAction = (data) => {
  return {
    type: 'INITIATE_DB',
    payload: {
      data,
    },
  };
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

export const deleteNoteAction = (id) => {
  console.log('Deleted note:', id);
  return {
    type: 'DELETE',
    payload: {
      id,
    },
  };
};

export default anecdoteReducer;
