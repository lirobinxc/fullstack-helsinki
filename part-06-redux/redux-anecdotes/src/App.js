import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  return (
    <div>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
      <Notification />
    </div>
  );
};

export default App;
