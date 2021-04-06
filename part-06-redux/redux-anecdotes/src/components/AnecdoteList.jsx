import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteNoteAction,
  initiateDbAction,
  voteAction,
} from '../reducers/anecdoteReducer';
import { notifyVote, notifyOff } from '../reducers/notificationReducer';
import { getAll } from '../services/anecdoteService';

let timer;

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const handleClick = (anecdote) => {
    clearTimeout(timer);
    dispatch(voteAction(anecdote.id));
    dispatch(notifyVote(anecdote.content));
    timer = setTimeout(() => {
      dispatch(notifyOff());
    }, 3000);
  };

  const handleDelete = (anecdote) => {
    const id = anecdote.id;
    dispatch(deleteNoteAction(id));
  };

  useEffect(() => {
    getAll().then((data) => dispatch(initiateDbAction(data)));
  }, [dispatch]);

  const filteredAnecdotes = anecdotes.filter((ele) =>
    ele.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div style={{ color: 'blue' }}>{anecdote.content}</div>
          <div>
            has{' '}
            <span style={{ color: 'green', fontWeight: 'bold' }}>
              {anecdote.votes}
            </span>
            &nbsp;
            <button onClick={(e) => handleClick(anecdote)}>Vote</button>
            <button onClick={(e) => handleDelete(anecdote)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AnecdoteList;
