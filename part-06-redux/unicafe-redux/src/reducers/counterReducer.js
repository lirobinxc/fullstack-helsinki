const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  console.log('numGood', state.good);
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 };
    case 'OK':
      return { ...state, ok: state.ok + 1 };
    case 'BAD':
      return { ...state, bad: state.bad + 1 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
export default counterReducer;

export const counterAdd = (num = 1) => {
  return {
    type: 'ADD',
    payload: { num },
  };
};
