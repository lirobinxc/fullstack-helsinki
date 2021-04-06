const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return (state = action.payload.filter);
    default:
      return state;
  }
};
export default filterReducer;

export const filterAction = (text) => {
  return {
    type: 'FILTER',
    payload: {
      filter: text,
    },
  };
};
