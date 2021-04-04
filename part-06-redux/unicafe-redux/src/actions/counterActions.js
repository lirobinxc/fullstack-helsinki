export const counterAdd = (num = 1) => {
  return {
    type: 'ADD',
    payload: { num },
  };
};
