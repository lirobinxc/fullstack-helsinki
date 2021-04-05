const notificationReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case 'NOTIFY_VOTE':
      return { message: `You upvoted ${action.payload.note}` };
    case 'NOTIFY_ADD_NOTE':
      return { message: `You added ${action.payload.note}` };
    case 'OFF':
      return { message: null };
    default:
      return { message: null };
  }
};
export default notificationReducer;

export const notifyVote = (note) => {
  return {
    type: 'NOTIFY_VOTE',
    payload: {
      note,
    },
  };
};

export const notifyAddNote = (e) => {
  const note = e.target.newNote.value;
  return {
    type: 'NOTIFY_ADD_NOTE',
    payload: {
      note,
    },
  };
};

export const notifyOff = () => {
  return {
    type: 'OFF',
  };
};
