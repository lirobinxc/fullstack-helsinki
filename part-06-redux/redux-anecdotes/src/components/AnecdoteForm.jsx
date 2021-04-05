import React from 'react';
import { useDispatch } from 'react-redux';
import { addNoteAction } from '../reducers/anecdoteReducer';
import { notifyAddNote, notifyOff } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Create New</h2>
      <form
        onSubmit={(e) => {
          dispatch(addNoteAction(e));
          dispatch(notifyAddNote(e));
          setTimeout(() => {
            dispatch(notifyOff());
          }, 3000);
        }}
      >
        <div>
          <input type="text" name="newNote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
export default AnecdoteForm;
