import { createStore } from 'redux';
import ReactDOM from 'react-dom';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

export const store = createStore(counterReducer, 0);
store.subscribe(() => {
  console.log('current state', store.getState());
});

const reRender = () => {
  ReactDOM.render(<Counter />, document.getElementById('root'));
};
store.subscribe(() => {
  reRender();
});
reRender();

function Counter() {
  return (
    <div className="Counter">
      <h1>Counter with Redux</h1>
      <h2 style={{ color: 'red' }}>{store.getState()}</h2>
      <button
        onClick={() => {
          store.dispatch({ type: 'INCREMENT' });
        }}
      >
        INCREMENT
      </button>
    </div>
  );
}

export default Counter;
