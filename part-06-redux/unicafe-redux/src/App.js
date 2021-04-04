import React from 'react';
import ReactDOM from 'react-dom';
import counterReducer, { counterAdd } from './reducers/counterReducer';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { createStore } from 'redux';

const App = () => {
  const dispatch = useDispatch();
  const numGood = useSelector((state) => state);
  console.log('numGood', numGood);

  const good = () => dispatch({ type: 'ADD' });

  const neutral = () => {};

  const bad = () => {};

  const reset = () => {};
  return (
    <div>
      <h1>Reducer Example</h1>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {useSelector((state) => state.good)}</div>
      <div>neutral {useSelector((state) => state.good)}</div>
      <div>bad {useSelector((state) => state.good)}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

export default App;
